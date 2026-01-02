import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  public sayHello() {
    return 'Hello World graphql';
  }

  @Query(() => String)
  public hello() {
    return 'Hello world';
  }
}
