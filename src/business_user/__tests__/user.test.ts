import { BusinessUserResolver } from "../resolver";
import BusinessUser from "../model";
import ServerErrorException from "../../exceptions/ServerErrorException";
import BadRequestException from "../../exceptions/BadRequestException";
import User from "../../user/model";

describe("UserResolver", () => {
  let userResolver: BusinessUserResolver;
  const businessID = "er34mgni5o";

  const users: BusinessUser[] = [
    {
      id: 1,
      name: "user1",
      email: "user1@gmail.com",
      business_id: businessID,
    },
    {
      id: 2,
      name: "user2",
      email: "user2@gmail.com",
      business_id: businessID,
    },
  ] as BusinessUser[];

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

    it("should create a user and return the created user", async () => {
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

      try {
        await userResolver.setBusinessDetails("1");
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore();
    });

    it("should create a business user and return the created user", async () => {
      const findMock = jest
        .spyOn(User, "findOne")
        .mockResolvedValueOnce(users[0]);

      try {
        await userResolver.setBusinessDetails(businessID);
      } catch (error: any) {
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });
  });
});
