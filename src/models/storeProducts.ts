import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import Image from './productImages';

@Entity('storeProducts')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  category: string;
  @Column()
  description: string;
  @Column()
  storePrice: number;
  @Column()
  storeQuantity: number;
  @Column()
  storeUnit: string;
  @Column()
  supplierPrice: number;
  @Column()
  supplierQuantity: number;
  @Column()
  supplierUnit: string;
  @Column()
  dueDate: string;

  @OneToOne(() => Image, (image) => image.product, {
    cascade: ['insert', 'update'],
  })
  image: Image;
}
