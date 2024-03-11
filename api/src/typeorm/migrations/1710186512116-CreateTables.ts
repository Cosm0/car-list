import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1710186512116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into users (username, password) values ('test', 'test123');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE username = test`);
  }
}
