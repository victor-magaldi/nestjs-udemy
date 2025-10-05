import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDto } from "src/users/dtos/user-dto";

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // console.log('running before the handler', context)

    return handler.handle().pipe(map((data) => {
      return plainToClass(UserDto, data, {
        excludeExtraneousValues: true
      })
    }))
  }

}