import mongoose, { Document, Schema } from 'mongoose';

export interface ILicense extends Document {
    licenseNumber?: string;
    number?: string;
    notificationNumber?: string;
    productName: string;
    country: string;
    manufacturer: string;
}

const LicenseSchema: Schema = new Schema(
    {
        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (v: string) {
                    return /^\d{8}$/.test(v);
                },
                message: 'License number must be exactly 8 digits'
            }
        },
        number: {
            type: String,
            required: false,
        },
        notificationNumber: {
            type: String,
            required: false,
        },
        productName: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        manufacturer: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// Index for efficient searching
LicenseSchema.index({ licenseNumber: 1 });
LicenseSchema.index({ productName: 'text' });

export default mongoose.model<ILicense>('License', LicenseSchema);
