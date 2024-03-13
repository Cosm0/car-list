import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1710186512116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUsers(queryRunner);
    await this.createRenters(queryRunner);
    await this.createVehicles(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.deleteUsers(queryRunner);
    await this.deleteVehicles(queryRunner);
    await this.deleteRenters(queryRunner);
  }

  async createUsers(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS users (
        id int NOT NULL AUTO_INCREMENT,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY IDX_fe0bb3f6520ee0469504521e71 (username)
      )`,
    );
  }

  async deleteUsers(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
  }

  async createRenters(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS renters (
        id int NOT NULL AUTO_INCREMENT,
        firstname varchar(255) NOT NULL,
        lastname varchar(255) NOT NULL,
        idNbr varchar(255) NOT NULL,
        address varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )`,
    );
  }

  async deleteRenters(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE renter;`);
  }

  async createVehicles(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id int NOT NULL AUTO_INCREMENT,
        brand varchar(255) NOT NULL,
        model varchar(255) NOT NULL,
        regNbr varchar(255) NOT NULL,
        vin varchar(255) NOT NULL,
        longitude int NOT NULL,
        latitude int NOT NULL,
        renterId int DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY IDX_6a1fdbc398bd49ee869a4890d1 (regNbr),
        UNIQUE KEY IDX_8288ce015b69c5856cf54e07a6 (vin),
        UNIQUE KEY REL_8a9d30e96205dfe4cff75fb863 (renterId),
        CONSTRAINT FK_8a9d30e96205dfe4cff75fb8630 FOREIGN KEY (renterId) REFERENCES renters (id)
      )`);
  }

  async deleteVehicles(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE vehicles;`);
  }
}
