import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ErrorLogDocument = ErrorLog & Document;

@Schema()
export class ErrorLog {
  @Prop({ required: true })
  message: string;

  @Prop()
  stack: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
