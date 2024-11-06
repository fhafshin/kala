import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export function swaggerConfigInit(app:INestApplication):void{

    const document=new DocumentBuilder()
        .setTitle("kala")
        .setDescription("service of kala")
        .setVersion("1.0.0v")
        .build();
    const swaggerDocument=SwaggerModule.createDocument(app,document);
    SwaggerModule.setup("/api",app,swaggerDocument);

}