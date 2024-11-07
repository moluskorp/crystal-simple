import { ErrorResponse } from "./error";

export type Fx6 = {
  id: number;
  code: number;
  pean_id: number;
  pean_product_id: number;
  pean_ean: string;
  pean_weightproduct: number;
  pean_generated: number;
  pean_generated_ean: number;
  prd_id: number;
  prd_description: string;
  prd_shortdescription: string;
  prd_weightProduct: boolean;
  prd_ncm: string;
  prd_group_id: number;
  prd_origin_id: number;
  prd_price1: number;
  prd_price2: number;
  prd_coust: number;
  prd_active: number;
  tax_ncm: string;
  tax_icmsnature: string;
  tax_icmspercentage: string;
  tax_icmsreduction: string;
  tax_ipicst: string;
  tax_ipipercentage: string;
  tax_piscofinscst: string;
  tax_pispercentage: string;
  tax_cofinspercentage: string;
  tax_fcppercentage: string;
}

export type GenerateFxResponse = ErrorResponse