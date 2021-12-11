<?php

namespace App\Services;

use App\Models\Product;

class ProductService extends Service{
    
    // new product add
    public function productAdd($inputData){
        $data = null;
        try{
            $data = Product::create($inputData);
        }catch(\Exception $ex){
            dd($ex->getMessage());
        }
        return $data;
    }

    // product edit by id
    public function productEdit($id,$inputData){
        $data = null;

        try{
            $data = Product::where('id',$id)->update($inputData);
        }catch(\Exception $ex){

        }

        return $data;
    }

    // product delete by id
    public function productDelete($id){
        $data = false;

        try{
            $data = Product::where('id',$id)->delete();
        }catch(\Exception $ex){
            dd($ex->getMessage());
        }

        return $data;
    }

    // get product by id
    public function getProductById($id){
        return Product::where('id',$id)->first();
    }

    // get all active products
    public function getAllActiveProducts(){
        return Product::where('status',1)->get();
    }
}