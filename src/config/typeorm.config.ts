import {TypeOrmModuleOptions} from "@nestjs/typeorm";


export function typeormConfig():TypeOrmModuleOptions{

const {DB_PORT,DB_HOST,DB_TYPE,DB_NAME,DB_PASSWORD,DB_USERNAME}=process.env;

return {
    type:DB_TYPE as any,
    host:DB_HOST,
    port:+DB_PORT,
    database:DB_NAME,
    username:DB_USERNAME,
    password:DB_PASSWORD,
    autoLoadEntities:false,
    synchronize:true,entities:["dist/**/**/*.entity.{ts,js}","dist/**/**/**/*.entity.{ts,js}"]
}
}