import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Product from './storeProducts';

@Entity('productImages')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  path: string;
  @OneToOne(() => Product, (product) => product.image)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
