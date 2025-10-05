import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface ClassInterceptor {
  new(...args: any[]): {}
}
export function Serialize(dto: ClassInterceptor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // console.log('running before the handler', context)

    return handler.handle().pipe(map((data) => {
      return plainToInstance(this.dto, data, {
        excludeExtraneousValues: true
      })
    }))
  }

}