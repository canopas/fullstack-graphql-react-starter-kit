import { BusinessUserResolver } from "../resolver";
import BusinessUser, { BusinessUserInput, LoginInput } from "../model";
import ServerErrorException from "../../exceptions/ServerErrorException";
import User from "../../user/model";
import UnauthorizedException from "../../exceptions/UnauthorizedException";
import BadRequestException from "../../exceptions/BadRequestException";
import { roles } from "../../config/const.config";

describe("UserResolver", () => {
  let userResolver: BusinessUserResolver;
  const businessID = "er34mgni5o";

  const users: BusinessUser[] = [
    {
      id: 1,
      name: "user1",
      email: "user1@gmail.com",
      username: "user@example.com",
      business_id: businessID,
      password: "testUser",
      role_id: roles.OWNER,
    },
    {
      id: 2,
      name: "user2",
      email: "user2@gmail.com",
      business_id: businessID,
    },
  ] as BusinessUser[];

  const input: LoginInput = {
    username: "user@example.com",
    businessId: businessID,
    password: "testUser",
  };

  const userInput: BusinessUserInput = {
    name: "user1",
  } as BusinessUserInput;

  beforeAll(() => {
    userResolver = new BusinessUserResolver();
  });

  describe("getBusinessUsers", () => {
    it("should handle errors while getting users", async () => {
      const findMock = jest
        .spyOn(BusinessUser, "findAll")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await userResolver.businessUsers(businessID);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should get created user", async () => {
      const findMock = jest
        .spyOn(BusinessUser, "findAll")
        .mockResolvedValueOnce(users);

      const result = await userResolver.businessUsers(businessID);

      expect(result).toEqual(users);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("getBusinessUser", () => {
    it("should handle errors while getting business user", async () => {
      const findMock = jest
        .spyOn(User, "findOne")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await userResolver.findBusinessUser(businessID);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should return business user", async () => {
      const findMock = jest
        .spyOn(User, "findOne")
        .mockResolvedValueOnce(users[0]);

      const result = await userResolver.findBusinessUser("4");

      expect(result).toEqual(users[0]);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("setBusinessDetails", () => {
    it("should handle server error during setting business", async () => {
      const findMock = jest
        .spyOn(User, "findOne")
        .mockResolvedValueOnce(users[0]);

      const createMock = jest
        .spyOn(BusinessUser, "create")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await userResolver.setBusinessDetails("1");
        expect(findMock).toHaveBeenCalledTimes(1);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(createMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore();
      createMock.mockRestore();
    });

    it("should create a business user and return the created user", async () => {
      const findMock = jest
        .spyOn(User, "findOne")
        .mockResolvedValueOnce(users[0]);

      const createMock = jest
        .spyOn(BusinessUser, "create")
        .mockResolvedValueOnce(users[0]);

      const result = await userResolver.setBusinessDetails(businessID);
      expect(result).toBe(true);
      expect(findMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledTimes(1);

      createMock.mockRestore();
      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("login", () => {
    it("should handle unauthorized error during login", async () => {
      const findMock = jest
        .spyOn(BusinessUser, "findOne")
        .mockResolvedValueOnce(null);
      try {
        input.password = "";
        await userResolver.login(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe("Invalid credentials!!");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should handle errors during admin login", async () => {
      const findMock = jest
        .spyOn(BusinessUser, "findOne")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await userResolver.login(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should login as admin of business dashboard", async () => {
      input.password = "testUser";
      users[0].password = input.password;
      const findMock = jest
        .spyOn(BusinessUser, "findOne")
        .mockResolvedValueOnce(users[0]);

      const result = await userResolver.login(input);

      expect(result).toEqual(users[0]);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("createUser", () => {
    it("should handle bad request error during user creation", async () => {
      const badInput: BusinessUserInput = {} as BusinessUserInput;
      try {
        await userResolver.createBusinessUser(badInput);
      } catch (error: any) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe("Username is required!");
      }
    });

    it("should handle server errors during admin creation", async () => {
      const createMock = jest
        .spyOn(BusinessUser, "create")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await userResolver.createBusinessUser(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(createMock).toHaveBeenCalledTimes(1);
      }

      createMock.mockRestore(); // Restore the original implementation
    });

    it("should create a user and return the created user", async () => {
      const createMock = jest
        .spyOn(BusinessUser, "create")
        .mockResolvedValueOnce(users[0]);

      const result = await userResolver.createBusinessUser(input);

      expect(result).toEqual(users[0]);
      expect(createMock).toHaveBeenCalledTimes(1);

      createMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("updateUser", () => {
    it("should handle errors when updating user", async () => {
      const updateMock = jest
        .spyOn(BusinessUser, "update")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        userInput.email = "user1@example.com";
        await userResolver.updateBusinessUser("1", input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(updateMock).toHaveBeenCalledTimes(1);
      }

      updateMock.mockRestore(); // Restore the original implementation
    });

    it("should update a user", async () => {
      const updateMock = jest
        .spyOn(BusinessUser, "update")
        .mockResolvedValueOnce([1]);

      const findMock = jest
        .spyOn(BusinessUser, "findOne")
        .mockResolvedValueOnce(users[0]);

      const result = await userResolver.updateBusinessUser("1", input);

      expect(result).toEqual(users[0]);

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(findMock).toHaveBeenCalledTimes(1);

      updateMock.mockRestore(); // Restore the original implementation
      findMock.mockRestore();
    });
  });

  describe("deleteUser", () => {
    it("should handle errors when deleting user", async () => {
      const deleteMock = jest
        .spyOn(BusinessUser, "destroy")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await userResolver.deleteBusinessUser(1);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(deleteMock).toHaveBeenCalledTimes(1);
      }

      deleteMock.mockRestore(); // Restore the original implementation
    });

    it("should delete a user", async () => {
      const deleteMock = jest
        .spyOn(BusinessUser, "destroy")
        .mockResolvedValueOnce(1);

      const result = await userResolver.deleteBusinessUser(1);

      expect(result).toEqual(true);

      expect(deleteMock).toHaveBeenCalledTimes(1);

      deleteMock.mockRestore(); // Restore the original implementation
    });
  });
});
