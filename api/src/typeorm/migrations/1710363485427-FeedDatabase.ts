import { MigrationInterface, QueryRunner } from 'typeorm';

export class FeedDatabase1710363485427 implements MigrationInterface {
  private data = {
    users: `
      INSERT INTO users (username, password) 
      VALUES ('test', 'test123');
    `,
    vehicles: `
      INSERT INTO vehicles (brand, model, regNbr, vin, longitude, latitude) 
      VALUES 
        ('VW', 'Golf', 'abc123', '123456789qwerty', 10, 20), 
        ('Honda', 'Civic', 'def456', '0987654321qwerty', 50, 40);
    `,
    renters: `
      INSERT INTO renters (firstname, lastname, idNbr, address, email) 
      VALUES 
        ('Adam', 'Nowak', 'id123', 'Malinowa 123, Stumilowy Las', 'prosiaczek@100las.pl'), 
        ('Jan', 'Kowalski', 'id456', 'Jagodowa 321, Stumilowy Las', 'tygrysek@100las.pl');
      `,
  };

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const query of Object.values(this.data)) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const tableName of Object.keys(this.data)) {
      this.truncateTable(queryRunner, tableName);
    }
  }

  private async truncateTable(queryRunner: QueryRunner, tableName: string) {
    await queryRunner.query(`TRUNCATE TABLE ${tableName}`);
  }
}
