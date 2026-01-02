import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  public sayHello() {
    return 'Hello World graphql';
  }
}
