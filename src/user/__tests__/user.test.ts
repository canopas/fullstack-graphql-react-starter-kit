import { UserResolver } from "../resolver";
import User, { BusinessInput, UserInput } from "../model";
import Business from "../../business/model";
import ServerErrorException from "../../exceptions/ServerErrorException";
import BadRequestException from "../../exceptions/BadRequestException";

describe("UserResolver", () => {
  let userResolver: UserResolver;

  const users: User[] = [
    {
      id: 1,
      name: "user1",
      email: "user1@gmail.com",
      city: "surat",
      business: {
        name: "business1",
      },
    },
    {
      id: 2,
      name: "user2",
      email: "user2@gmail.com",
      city: "surat",
      business: {
        name: "business2",
      },
    },
  ] as User[];

  const businessInput: BusinessInput = {
    name: "Test Business",
  };

  const input: UserInput = {
    name: "user1",
    phone: "123456789",
    city: "surat",
  } as UserInput;

  beforeAll(() => {
    userResolver = new UserResolver();
  });

  describe("getUsers", () => {
    it("should handle errors while getting users", async () => {
      const findMock = jest
        .spyOn(User, "findAll")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server")
        );

      try {
        await userResolver.users();
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should create a user and return the created user", async () => {
      const findMock = jest.spyOn(User, "findAll").mockResolvedValueOnce(users);

      const result = await userResolver.users();

      expect(result).toEqual(users);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("getUser", () => {
    it("should handle errors while getting user", async () => {
      const findMock = jest
        .spyOn(User, "findOne")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server")
        );

      try {
        await userResolver.user("1");
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should return user", async () => {
      const findMock = jest
        .spyOn(User, "findOne")
        .mockResolvedValueOnce(users[0]);

      const result = await userResolver.user("1");

      expect(result).toEqual(users[0]);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("createBusinessUser", () => {
    it("should handle bad request error for email during user creation", async () => {
      try {
        await userResolver.createBusinessUser(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe("Email is required!");
      }
    });

    it("should handle bad request error during user creation", async () => {
      try {
        input.email = "user1@example.com";
        await userResolver.createBusinessUser(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe("Business details are required!");
      }
    });

    it("should handle server error during user creation", async () => {
      const createMock = jest
        .spyOn(User, "create")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server")
        );

      try {
        input.business = businessInput;
        await userResolver.createBusinessUser(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(createMock).toHaveBeenCalledTimes(1);
      }

      createMock.mockRestore(); // Restore the original implementation
    });

    it("should create a user and return the created user", async () => {
      const createMock = jest.spyOn(User, "create").mockResolvedValueOnce({
        id: 1,
        name: "Test User",
        email: "test@example.com",
      });

      const createBusinessMock = jest
        .spyOn(Business, "create")
        .mockResolvedValueOnce({
          id: 1,
          name: "Test Business",
          business_type_id: 1,
        });

      const result = await userResolver.createBusinessUser(input);

      expect(result).toEqual({
        id: 1,
        name: "Test User",
        email: "test@example.com",
      });
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createBusinessMock).toHaveBeenCalledTimes(1);

      createMock.mockRestore(); // Restore the original implementation
      createBusinessMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("updateUser", () => {
    it("should handle errors when updating user", async () => {
      const updateMock = jest
        .spyOn(User, "update")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server")
        );

      try {
        input.email = "user1@example.com";
        await userResolver.updateUser("1", input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(updateMock).toHaveBeenCalledTimes(1);
      }

      updateMock.mockRestore(); // Restore the original implementation
    });

    it("should update a user", async () => {
      const updateMock = jest.spyOn(User, "update").mockResolvedValueOnce([1]);

      const updateBusinessMock = jest
        .spyOn(Business, "update")
        .mockResolvedValueOnce([1]);

      const findMock = jest
        .spyOn(User, "findOne")
        .mockResolvedValueOnce(users[0]);

      const result = await userResolver.updateUser("1", input);

      expect(result).toEqual(users[0]);

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateBusinessMock).toHaveBeenCalledTimes(1);
      expect(findMock).toHaveBeenCalledTimes(1);

      updateMock.mockRestore(); // Restore the original implementation
      updateBusinessMock.mockRestore(); // Restore the original implementation
      findMock.mockRestore();
    });
  });

  describe("deleteUser", () => {
    it("should handle errors when deleting user", async () => {
      const deleteMock = jest
        .spyOn(User, "destroy")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server")
        );

      try {
        await userResolver.deleteUser(1);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(deleteMock).toHaveBeenCalledTimes(1);
      }

      deleteMock.mockRestore(); // Restore the original implementation
    });

    it("should delete a user", async () => {
      const deleteMock = jest.spyOn(User, "destroy").mockResolvedValueOnce(1);

      const deleteBusinessMock = jest
        .spyOn(Business, "destroy")
        .mockResolvedValueOnce(1);

      const result = await userResolver.deleteUser(1);

      expect(result).toEqual(true);

      expect(deleteMock).toHaveBeenCalledTimes(1);
      expect(deleteBusinessMock).toHaveBeenCalledTimes(1);

      deleteMock.mockRestore(); // Restore the original implementation
      deleteBusinessMock.mockRestore(); // Restore the original implementation
    });
  });
});
