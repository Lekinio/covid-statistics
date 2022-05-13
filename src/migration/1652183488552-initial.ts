import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1652183488552 implements MigrationInterface {
    name = 'initial1652183488552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`statistic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`confirmed\` int NOT NULL, \`recovered\` int NOT NULL, \`death\` int NOT NULL, \`countryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`statistic\` ADD CONSTRAINT \`FK_0b6a285d7f9252ffe35324a2194\` FOREIGN KEY (\`countryId\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`statistic\` DROP FOREIGN KEY \`FK_0b6a285d7f9252ffe35324a2194\``);
        await queryRunner.query(`DROP TABLE \`country\``);
        await queryRunner.query(`DROP TABLE \`statistic\``);
    }

}
