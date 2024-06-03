import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError, host: ArgumentsHost) {
        // console.error(exception.message);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message = exception.message.replace(/\n/g, '');
        let CustomMessage;
        const errorRespose = (messParams: string) => {
            const status = HttpStatus.CONFLICT;
            response.status(status).json({
                statusCode: status,
                message: messParams,
            });
        }
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            switch (exception.code) {
                case 'P2025': {
                    CustomMessage = 'An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.'
                    errorRespose(CustomMessage)
                    break;
                }
                case 'P2002': {
                    errorRespose(message)
                    break;
                }
                case 'P2003': {
                    CustomMessage = 'The specified related record does not exist. Please ensure you are referencing a valid record.'
                    errorRespose(CustomMessage);
                    break;
                }
                case 'P2005': {
                    const status = HttpStatus.CONFLICT;
                    response.status(status).json({
                        statusCode: status,
                        message: "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type",
                    });
                    break;
                }
                default:
                    // default 500 error code
                    super.catch(exception, host);
                    break;
            }
        } else if (exception instanceof Prisma.PrismaClientValidationError) {
            const status = HttpStatus.BAD_REQUEST;
            response.status(status).json({
                statusCode: status,
                message: 'Validation failed for the given data. Please check your input and try again.',
                // details: message,
            });
        }
    }
}