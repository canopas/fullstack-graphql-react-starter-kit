import { BusinessResolver } from "../resolver";
import Business, { BusinessInput } from "../model";
import ServerErrorException from "../../exceptions/ServerErrorException";
import NotFoundException from "../../exceptions/NotFoundException";

describe("BusinessResolver", () => {
  let businessResolver: BusinessResolver;
  const businessID = "er34mgni5o";
  const detail: Business = {
    id: 1,
    name: "MyBusiness",
  } as Business;

  const input: BusinessInput = {
    description: "TestDescription",
    address: "TestAddress",
    city: "Surat",
    business_type_id: 1,
  };

  beforeAll(() => {
    businessResolver = new BusinessResolver();
  });

  describe("getBusinessDetails", () => {
    it("should handle errors while getting details", async () => {
      const findMock = jest
        .spyOn(Business, "findOne")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await businessResolver.businessDetails(businessID);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should handle not found while getting details", async () => {
      const findMock = jest
        .spyOn(Business, "findOne")
        .mockResolvedValueOnce(null);

      try {
        await businessResolver.businessDetails("dtvcxvdgr");
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Not found");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should get given business detail", async () => {
      const findMock = jest
        .spyOn(Business, "findOne")
        .mockResolvedValueOnce(detail);

      const result = await businessResolver.businessDetails(businessID);

      expect(result).toEqual(detail);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("updateBusinessDetail", () => {
    it("should handle errors when updating details", async () => {
      const updateMock = jest
        .spyOn(Business, "update")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await businessResolver.updateBusinessDetails("1", input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(updateMock).toHaveBeenCalledTimes(1);
      }

      updateMock.mockRestore(); // Restore the original implementation
    });

    it("should update a business details", async () => {
      const updateMock = jest
        .spyOn(Business, "update")
        .mockResolvedValueOnce([1]);

      const findMock = jest
        .spyOn(Business, "findOne")
        .mockResolvedValueOnce(detail);

      const result = await businessResolver.updateBusinessDetails("1", input);

      expect(result).toEqual(detail);

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(findMock).toHaveBeenCalledTimes(1);

      updateMock.mockRestore(); // Restore the original implementation
      findMock.mockRestore();
    });
  });
});
