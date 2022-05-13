import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1652263421045 implements MigrationInterface {
    name = 'initial1652263421045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`country\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`country\` ADD \`en\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`country\` ADD \`ka\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`country\` DROP COLUMN \`ka\``);
        await queryRunner.query(`ALTER TABLE \`country\` DROP COLUMN \`en\``);
        await queryRunner.query(`ALTER TABLE \`country\` ADD \`name\` varchar(255) NOT NULL`);
    }

}
