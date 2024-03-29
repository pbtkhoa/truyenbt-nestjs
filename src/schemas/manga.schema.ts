import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tag } from './tag.schema';
import { Author } from './author.schema';

export enum MANGA_STATUS {
    CONTINUE = '0',
    COMPLETE = '1',
}

export enum MANGA_SORT_TYPE {
    BY_CREATED = '0',
    BY_TOP_ALL = '1',
    BY_TOP_YEAR = '2',
    BY_TOP_MONTH = '3',
    BY_TOP_WEEK = '4',
}

@Schema({
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
})
export class Manga extends Document {
    @Prop()
    name: string;

    @Prop()
    otherName: string;

    @Prop({ unique: true })
    slug: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Author.name })
    author: Author;

    @Prop({
        type: String,
        get: (imageUrl: string): string => {
            return !!imageUrl ? `${process.env.UPLOAD_BASE_URL}${imageUrl}` : '';
        },
    })
    imagePreview: string;

    @Prop({ type: Number, default: 0 })
    viewCount: number;

    @Prop({ type: Number, default: 0 })
    like: number;

    @Prop({ type: Number, default: 0 })
    follow: number;

    @Prop()
    description: string;

    @Prop({ default: MANGA_STATUS.CONTINUE })
    status: MANGA_STATUS;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Tag.name }])
    tags: Tag[];

    @Prop({ type: Date, default: new Date() })
    publishedAt: Date;
}

export const MangaSchema = SchemaFactory.createForClass(Manga);
