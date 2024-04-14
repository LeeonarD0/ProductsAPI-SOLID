import { Product } from "../../../entities/product";
import { ProductRepository } from "../../../repositories/product/product.repository";
import {
  BuyOutputDto,
  CreateOutputDto,
  ListOutputDto,
  ProductService,
  SellOutputDto,
} from "../product.services";

export class ProductServiceImplementation implements ProductService {
  constructor(readonly repository: ProductRepository) {}

  public static build(repository: ProductRepository) {
    return new ProductServiceImplementation(repository);
  }
///
  public async buy(id: string, amount: number): Promise<BuyOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error(`Product ${id} not found!`);
    }

    aProduct.buy(amount);

    await this.repository.update(aProduct);

    const output: BuyOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity,
    };

    return output;
  }
///
  public async sell(id: string, amount: number): Promise<SellOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error(`Product ${id} not found!`);
    }

    aProduct.sell(amount);

    await this.repository.update(aProduct);

    const output: SellOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity,
    };

    return output;
}
///
  public async list(): Promise<ListOutputDto> {
    const aProduct = await this.repository.list();

    const products = aProduct.map((p) => {
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        balance: p.quantity,
      };
    });

    const output: ListOutputDto = {
      products,
    };

    return output;
  }
  
  public async create(name: string, price: number): Promise<CreateOutputDto> {
      const aProduct = Product.create(name, price)

      await this.repository.save(aProduct)

      const output: CreateOutputDto = {
        id: aProduct.id,
        balance: aProduct.quantity
      }
    

      return output

  }
}
