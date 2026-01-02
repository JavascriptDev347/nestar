import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
  APARTMENT="APARTMENT",
  VILLA= "VILLA",
  HOUSE="HOUSE",
}

registerEnumType(PropertyType, {
  name: "PropertyType",
});

export enum PropertyStatus {
  HOLD="HOLD",
  ACTIVE="ACTIVE",
  SOLD="SOLD",
  DELETE="DELETE",
}

registerEnumType(PropertyStatus, {
  name: "PropertyStatus",
});

export enum PropertyLocation {
  TASHKENT = 'TASHKENT',
  SAMARKAND = 'SAMARKAND',
  BUKHARA = 'BUKHARA',
  ANDIJAN = 'ANDIJAN',
  FERGANA = 'FERGANA',
  NAMANGAN = 'NAMANGAN',
  NUKUS = 'NUKUS',
  URGENCH = 'URGENCH',
  KHIVA = 'KHIVA',
  JIZZAKH = 'JIZZAKH',
  KARSHI = 'KARSHI',
  TERMEZ = 'TERMEZ',
}

registerEnumType(PropertyLocation, {
  name: "PropertyLocation",
})
