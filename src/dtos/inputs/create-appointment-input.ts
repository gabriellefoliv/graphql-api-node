import { IsDate, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAppointmentInput {
    @IsString()
    @Field()
    customerId: String;

    @IsDate()
    @Field()
    startsAt: Date;

    @IsString()
    @Field()
    endsAt: Date;
}