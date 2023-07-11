import { AdminResolver } from "../resolver";
import Admin, { AdminInput } from "../model";
import ServerErrorException from "../../exceptions/ServerErrorException";
import BadRequestException from "../../exceptions/BadRequestException";
import UnauthorizedException from "../../exceptions/UnauthorizedException";

describe("UserResolver", () => {
  let adminResolver: AdminResolver;

  const admin: Admin = {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
  } as Admin;

  const input: AdminInput = {
    name: "Admin",
    email: "admin@example.com",
    password: "testAdmin",
  };

  beforeAll(() => {
    adminResolver = new AdminResolver();
  });

  describe("createAdmin", () => {
    it("should handle bad request error during admin creation", async () => {
      const badInput: AdminInput = {} as AdminInput;
      try {
        await adminResolver.createAdmin(badInput);
      } catch (error: any) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe("users.email cannot be null");
      }
    });

    it("should handle server errors during admin creation", async () => {
      const createMock = jest
        .spyOn(Admin, "create")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await adminResolver.createAdmin(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(createMock).toHaveBeenCalledTimes(1);
      }

      createMock.mockRestore(); // Restore the original implementation
    });

    it("should create a user and return the created user", async () => {
      const createMock = jest
        .spyOn(Admin, "create")
        .mockResolvedValueOnce(admin);

      const result = await adminResolver.createAdmin(input);

      expect(result).toEqual(admin);
      expect(createMock).toHaveBeenCalledTimes(1);

      createMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("adminLogin", () => {
    it("should handle unauthorized error during admin login", async () => {
      const findMock = jest.spyOn(Admin, "findOne").mockResolvedValueOnce(null);
      try {
        input.password = "";
        await adminResolver.adminLogin(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe("Invalid credentials!!");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should handle errors during admin login", async () => {
      const findMock = jest
        .spyOn(Admin, "findOne")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await adminResolver.adminLogin(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should login as admin", async () => {
      admin.password = input.password;
      const findMock = jest
        .spyOn(Admin, "findOne")
        .mockResolvedValueOnce(admin);

      const result = await adminResolver.adminLogin(input);

      expect(result).toEqual(admin);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });
});
