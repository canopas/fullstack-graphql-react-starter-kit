import { UserResolver } from "../resolver";
import User, { UserInput } from "../model";
import Business from "../../business/model";
import ServerErrorException from "../../exceptions/ServerErrorException";

describe("UserResolver", () => {
  let userResolver: UserResolver;

  const input: UserInput = {
    name: "Test User",
    email: "test@example.com",
    phone: "123456789",
    city: "Test City",
    business_name: "Test Business",
  };

  beforeAll(() => {
    userResolver = new UserResolver();
  });

  describe("createUser", () => {
    it("should handle errors during user creation", async () => {
      const createMock = jest
        .spyOn(User, "create")
        .mockRejectedValueOnce(new ServerErrorException("Server error"));

      try {
        await userResolver.createUser(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("Server error");
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

      const result = await userResolver.createUser(input);

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
});
