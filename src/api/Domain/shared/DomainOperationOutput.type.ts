import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DomainOperationOutput {
    @Field(() => String, { nullable: true })
    OperationId: string;
}
