import { IsString } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Appointment {
    @IsString()
    @Field()
    startsAt: Date;

    @IsString()
    @Field()
    endsAt: Date;
}