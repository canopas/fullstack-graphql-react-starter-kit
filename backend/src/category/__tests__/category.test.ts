import { CategoryResolver } from "../resolver";
import Category, { CategoryInput } from "../model";
import ServerErrorException from "../../exceptions/ServerErrorException";
import BadRequestException from "../../exceptions/BadRequestException";

describe("CategoryResolver", () => {
  let resolver: CategoryResolver;
  const businessID = "er34mgni5o";

  const categories: Category[] = [
    {
      id: 1,
      name: "category1",
      parent_id: 0,
    },
    {
      id: 2,
      name: "category2",
      parent_id: 1,
    },
  ] as Category[];

  let input: CategoryInput = {} as CategoryInput;

  beforeAll(() => {
    resolver = new CategoryResolver();
  });

  describe("getCategories", () => {
    it("should handle errors while getting categories", async () => {
      const findMock = jest
        .spyOn(Category, "findAll")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await resolver.categories(businessID);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should return categories", async () => {
      const findMock = jest
        .spyOn(Category, "findAll")
        .mockResolvedValueOnce(categories);

      const result = await resolver.categories(businessID);

      expect(result).toEqual(categories);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("getCategory", () => {
    it("should handle errors while getting category", async () => {
      const findMock = jest
        .spyOn(Category, "findOne")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await resolver.category("4");
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(findMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore(); // Restore the original implementation
    });

    it("should return category", async () => {
      const findMock = jest
        .spyOn(Category, "findOne")
        .mockResolvedValueOnce(categories[0]);

      const result = await resolver.category("1");

      expect(result).toEqual(categories[0]);
      expect(findMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("createCategory", () => {
    it("should handle bad request error for input during category creation", async () => {
      try {
        await resolver.createCategory(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe("Name and business id are required!");
      }
    });

    it("should handle server error during category creation", async () => {
      const createMock = jest
        .spyOn(Category, "create")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        input.name = "category3";
        input.parent_id = 0;

        await resolver.createCategory(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(createMock).toHaveBeenCalledTimes(1);
      }

      createMock.mockRestore(); // Restore the original implementation
    });

    it("should create a category and return the created category", async () => {
      const cat = {
        id: 1,
        name: "category3",
        business_id: businessID,
        parent_id: 0,
      };
      const createMock = jest
        .spyOn(Category, "create")
        .mockResolvedValueOnce(cat);

      input.business_id = businessID;
      const result = await resolver.createCategory(input);

      expect(result).toEqual(cat);
      expect(createMock).toHaveBeenCalledTimes(1);

      createMock.mockRestore(); // Restore the original implementation
    });
  });

  describe("updateCategory", () => {
    it("should handle errors when updating category", async () => {
      const updateMock = jest
        .spyOn(Category, "update")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await resolver.updateCategory("1", input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(updateMock).toHaveBeenCalledTimes(1);
      }

      updateMock.mockRestore(); // Restore the original implementation
    });

    it("should update a category", async () => {
      const updateMock = jest
        .spyOn(Category, "update")
        .mockResolvedValueOnce([1]);

      const findMock = jest
        .spyOn(Category, "findOne")
        .mockResolvedValueOnce(categories[0]);

      const result = await resolver.updateCategory("1", input);

      expect(result).toEqual(categories[0]);

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(findMock).toHaveBeenCalledTimes(1);

      updateMock.mockRestore(); // Restore the original implementation
      findMock.mockRestore();
    });
  });

  describe("deleteCategory", () => {
    it("should handle errors when deleting category", async () => {
      const findMock = jest
        .spyOn(Category, "findAll")
        .mockResolvedValueOnce([]);

      const deleteMock = jest
        .spyOn(Category, "destroy")
        .mockRejectedValueOnce(
          new ServerErrorException("An error occurred at server"),
        );

      try {
        await resolver.deleteCategory(1);
        expect(findMock).toHaveBeenCalledTimes(1);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ServerErrorException);
        expect(error.message).toBe("An error occurred at server");
        expect(deleteMock).toHaveBeenCalledTimes(1);
      }

      findMock.mockRestore();
      deleteMock.mockRestore(); // Restore the original implementation
    });

    it("should delete a category", async () => {
      const deleteMock = jest
        .spyOn(Category, "destroy")
        .mockResolvedValueOnce(1);

      const findMock = jest
        .spyOn(Category, "findAll")
        .mockResolvedValueOnce([]);

      const result = await resolver.deleteCategory(1);

      expect(result).toEqual(true);

      expect(findMock).toHaveBeenCalledTimes(1);
      expect(deleteMock).toHaveBeenCalledTimes(1);

      findMock.mockRestore(); // Restore the original implementation
      deleteMock.mockRestore(); // Restore the original implementation
    });
  });
});
