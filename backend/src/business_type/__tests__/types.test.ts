import ServerErrorException from "../../exceptions/ServerErrorException";
import BusinessType from "../model";
import { BusinessTypeResolver } from "../resolver";

describe("TypeResolver", () => {
  let typeResolver: BusinessTypeResolver;

  const types: BusinessType[] = [
    {
      id: 1,
      type: "type1",
    },
    {
      id: 2,
      type: "type2",
    },
  ] as BusinessType[];

  beforeAll(() => {
    typeResolver = new BusinessTypeResolver();
  });

  describe("getBusinessTypes", () => {
    it("should handle errors while getting types", async () => {
      const findMock = jest
        .spyOn(BusinessType, "findAll")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await typeResolver.businessTypes();
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should get all business types", async () => {
      const findMock = jest
        .spyOn(BusinessType, "findAll")
        .mockResolvedValueOnce(types);

      const result = await typeResolver.businessTypes();

      expect(result).toEqual(types);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });
});
