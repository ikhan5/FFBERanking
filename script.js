$(document).ready(function () {
    $.getJSON("units.json", function (data) {
        $("#unit-search").select2({
            placeholder: "--Select A Unit--"
        });

        $.each(data, function (index, value) {

            if (value.rarity_max === 6) {
                $("#unit-search .six-star").append(`<option value=${value.name}>${value.name}</option>`);
            }
            if (value.rarity_max === 7) {
                $("#unit-search .seven-star").append(`<option value=${value.name} class='ui-widget-content sortable list-group-item'>${value.name}</option>`);
            }
        });

        $('#unit-search').on("change", function () {
            let unitChoice = "<li class='ui-widget-content sortable list-group-item'>" + $('#unit-search').select2("data")[0]['text'] + "</li>";
            $("#unit-listing").append(unitChoice);
        });
    });

    $("#ordered").hide();
    /* https://jsfiddle.net/KyleMit/Geupm/2/  */
    $("#delete").on("click", function () {
        $("#unit-listing").empty();
    });

    /*https://stackoverflow.com/questions/6940390/how-do-i-duplicate-item-when-using-jquery-sortable */

    $("ol[id*='unit-ranking']").sortable({
        connectWith: ".list-group",
        receive: function (e, li) {
            copyHelper = null;
        }
    });

    $("#unit-listing").sortable({
        connectWith: ".list-group",
        forcePlaceholderSize: false,
        helper: function (e, li) {
            copyHelper = li.clone().insertAfter(li);
            return li.clone();
        },
        stop: function () {
            copyHelper && copyHelper.remove();
        }
    }).disableSelection();

    $("#unit-ranking").sortable({
        itmes: "li:not(.placeholder)",
        connectWith: ".list-group",
        dropOnEmpty: true,
        sort: function () {
            $(this).removeClass("ui-state-default");
        },
        over: function () {
            $(".placeholder").hide();
            console.log($("#unit-ranking").children(":not(.placeholder)").length);
        }
    }).disableSelection();

    let unitSection = location.search;
    if (unitSection === "?physical") {
        $("[id^='ordered-phys']").show();
    }
    if (unitSection === "?mages") {
        $("[id^='ordered-mag']").show();
    }
    if (unitSection === "?supports") {
        $("[id*='sup']").show();
    }
    if (unitSection === "?tanks") {
        $("[id*='tank']").show();
    }
});