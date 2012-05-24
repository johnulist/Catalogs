$(function() {
    var radioState = Array();
    var index = 0;

    $.ajax({
        type: "POST",
        data: $('#OrderItemViewForm').serialize(),
        url: "/catalogs/catalog_items/get_attribute_values/co_id:" ,
        dataType: "text",
        success:function(data){
        response(data)
        }
    });

    $('#add_button').click(function (e) {
        // this will check if radio button(s) exist on form and are not checked
        // it will also now only fire if they aren't all disabled
        var allDisabled = true;
        $("input[type=radio]").each(function(){
          if(!$(this).attr('disabled')) allDisabled = false;
        });
        if($('.CatalogAttribute').length != 0 && !$('input[type=radio]:checked', '#OrderItemViewForm').val() && !allDisabled) {
            e.preventDefault();
            alert('Please choose options');
        }
    });

    //on radio selected
    $(':radio').click(function () {
        radioState = Array();
        $('#stock').html('');
        if ( $('#' + $(this).attr('id')).attr("checked") == true) {
            // radio state stores the state of the adjacent radio button clicked
            $(this).siblings(':radio').each(function(){
                if(!$(this).attr('disabled')) {
                    radioState[index++] = $(this).attr('value');
                }
            });
        }

        if ( $('#' + $(this).attr('id')).attr("checked") == true) {
            $.ajax({
                type: "POST",
                data: $('#OrderItemViewForm').serialize(),
                url: "/catalogs/catalog_items/get_attribute_values/co_id:" +$(this).attr('value') ,
                dataType: "text",
                success:function(data){
                response(data)
                }
            });
        }
    });
    function response(data) {
        if (data.length > 0) {
            var response = JSON.parse(data);
            $(':radio').attr('disabled', false);

            // take the options to be shown and disable rest.
            $(':radio').each(function(){

                flag = false;
                for (x in response["CategorizedOption"]) {
                    // if id is present in enbaled list response or id is in same group as clicked
                    // then enable it
                    if (response["CategorizedOption"][x] == $(this).attr('value')
                            || $.inArray($(this).attr('value'), radioState) >= 0
                    ){
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    $(this).attr('checked', false);
                    $(this).attr('disabled', true);
                    $(this).hide().next().hide(); // hide invalids and their following label
                }

            });


            // hides the fieldset if none of the options are displayed.
            $(".catalogItemOptions").each(function(){
                var allHidden = true;
                $parent = $(this);
                $parent.find("input").each(function(){
                    if($(this).is(":visible")) allHidden = false;
                });
                if(allHidden == true) $parent.hide();
            });


            if(response["CatalogItem"]) {
                if(response["CatalogItem"]["stock"] != '' && response["CatalogItem"]["stock"] != "0") {
                    $('#OrderItemCatalogItemId').val(response["CatalogItem"]["id"]);
                    if (response["CatalogItem"]["stock"] < 10) {
                        st = '<div> Only ' + response["CatalogItem"]["stock"] + ' left. </div>';
                        $("#stock").html(st);
                    }

                    $("#itemPrice").html(response["CatalogItem"]["price"]);

                    var childItem = response["CatalogItem"]["id"];
                    var childGallery = $("#childGallery" + childItem).html();
                    if (childGallery) {
                        $(".catalogItemGallery").html(childGallery);
                    }
                }
            }
        }
    }
});