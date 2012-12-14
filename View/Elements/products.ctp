<div class="products" id="elementProducts">
    <div class="indexContainer">
    <?php
    $i = 0;
    foreach ($products as $product) { ?>
        <div class="indexRow">
            <div class="indexCell galleryThumb" id="galleryThumb<?php echo $product['Product']['id']; ?>"> 
                <?php echo $this->Element('thumb', array('model' => 'Product', 'foreignKey' => $product['Product']['id'], 'thumbSize' => 'medium', 'thumbLink' => '/products/products/view/'.$product['Product']['id']), array('plugin' => 'galleries')); ?>
            </div>
            <div class="indexCell itemName productName" id="productName<?php echo $product["Product"]["id"]; ?>"> 
                <?php echo $this->Html->link($product['Product']['name'] , array('controller' => 'products' , 'action'=>'view' , $product["Product"]["id"])); ?> 
            </div>
            <?php if (!empty($product['ProductBrand'])) { ?>
                <div class="indexCell itemBrand productBrand" id="productBrand<?php echo $product["Product"]["id"]; ?>"> <?php echo $this->Html->link($product['ProductBrand']['name'] , array('controller' => 'product_brands' , 'action'=>'view' , $product["ProductBrand"]["id"])); ?> </div>
            <?php } ?>
            <div class="indexCell itemDescription productDescription" id="productDescription<?php echo $product["Product"]["id"]; ?>"> 
                <?php echo strip_tags($product['Product']['summary']); ?> 
            </div>
            <div class="indexCell itemPrice productPrice" id="productPrice<?php echo $product['Product']['id']; ?>"> 
                <?php echo __('$'); ?><?php echo (!empty($product['ProductPrice'][0]['price']) ? $product['ProductPrice'][0]['price'] : $product['Product']['price']); ?> 
            </div>
            <?php if (empty($product['Option'])) { ?>
            <div class="indexCell itemAction productAction" id="productAction<?php echo $product['Product']['id']; ?>"> 
                <?php echo $this->Element('cart_add', array('product' => $product), array('plugin' => 'products')); ?> 
            </div>
            <?php } ?>
        </div>
    <?php
    } ?>
    </div>
    <?php echo $this->Element('paging');?>
</div>