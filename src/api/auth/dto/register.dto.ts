import { IsExistsUser } from '@src/validators/is-exists-user.decorator';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Match } from '@src/validators/match.decorator';
import { Optional } from '@nestjs/common';

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    @IsExistsUser()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    password: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    @Match('password')
    password_confirm: string;

    @Optional()
    firstName: string;

    @Optional()
    lastName: string;
}
