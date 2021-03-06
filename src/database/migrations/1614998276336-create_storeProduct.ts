import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createStoreProduct1614998276336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'storeProducts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'storePrice',
            type: 'integer',
          },
          {
            name: 'storeQuantity',
            type: 'integer',
          },
          {
            name: 'storeUnit',
            type: 'varchar',
          },
          {
            name: 'supplierPrice',
            type: 'integer',
          },
          {
            name: 'supplierQuantity',
            type: 'integer',
          },
          {
            name: 'supplierUnit',
            type: 'varchar',
          },
          {
            name: 'dueDate',
            type: 'varchar',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
