import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class users1644522508318 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'users',
            columns:[
                {
                    name:'id',
                    type:'int4',
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment'
                },
                {
                    name:'name',
                    type:'varchar',
                    length: '500',
                    isNullable:false
                },
                {
                    name:'email',
                    type:'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name:'password',
                    type:'varchar',
                    length: '1000',
                    isNullable: false
                },
                {
                    name:'created_at',
                    type:'timestamptz',
                    isNullable: false,
                    default: 'now()'
                },
                {
                    name:'updated_at',
                    type:'timestamptz',
                    isNullable: false,
                    default: 'now()'
                }
    
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
