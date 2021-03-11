import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import storeProducts from './storeProducts';

@Entity('productImages')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  path: string;
  @OneToOne(() => storeProducts, (storeProduct) => storeProduct.image)
  @JoinColumn({ name: 'productId' })
  storeProduct: storeProducts;
}
