//(if collecting data with php/server instead of MTurk)
//var experimentName = "likelihood-exp1";
//var submitAddress = "https://web.stanford.edu/~sunwooj/cgi-bin/process.php";


// List of stimuli
// 3 between-subject conditions that differ in range of alternatives

var stimuliList = [ 

// ["cond1:MinAltBare", 
//     [ ["It might rain.", "Cam", "Prue", ["rain0", "rain10", "rain20", "rain30", "rain40", "rain50", "rain60", "rain70", "rain80", "rain90", "rain100"], "might"], 
//     ["It will rain.", "Jasper", "Minta", ["rain20", "rain30", "rain40", "rain50", "rain60", "rain70", "rain80", "rain90", "rain100", "rain0", "rain10"], "will"], 
//     ["It might rain.", "James", "Andrew", ["rain40", "rain50", "rain60", "rain70", "rain80", "rain90", "rain100", "rain0", "rain10", "rain20", "rain30"], "might"], 
//     ["It will rain.", "Nancy", "Charles", ["rain60", "rain70", "rain80", "rain90", "rain100", "rain0", "rain10", "rain20", "rain30", "rain40", "rain50"], "will"], 
//     ["It might rain.", "Paul", "Mrs. Ramsey", ["rain80", "rain90", "rain100", "rain0", "rain10", "rain20", "rain30", "rain40", "rain50", "rain60", "rain70"], "might"], 
//     ["It will rain.", "Lily", "Mr. Tansley", ["rain100", "rain0", "rain10", "rain20", "rain30", "rain40", "rain50", "rain60", "rain70", "rain80", "rain90"], "will"],
//     ["It's going to be cold.", "Meg", "Laurie", ["filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1"], "filler3"],
//     ["It's going to be hot.", "Jim", "Beth", ["filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2"], "filler4"]
//      ]],

["cond2:MedAltBare", 
    [ ["It might rain.", "Cam", "Prue", ["rain0", "rain10", "rain20", "rain30", "rain40", "rain50", "rain60", "rain70", "rain80", "rain90", "rain100"], "might"], 
    ["It's likely to rain.", "Jasper", "Minta", ["rain20", "rain30", "rain40", "rain50", "rain60", "rain70", "rain80", "rain90", "rain100", "rain0", "rain10"], "likely"], 
    ["It will rain.", "James", "Andrew", ["rain40", "rain50", "rain60", "rain70", "rain80", "rain90", "rain100", "rain0", "rain10", "rain20", "rain30"], "will"], 
    ["It might rain.", "Nancy", "Charles", ["rain60", "rain70", "rain80", "rain90", "rain100", "rain0", "rain10", "rain20", "rain30", "rain40", "rain50"], "might"], 
    ["It's likely to rain.", "Paul", "Mrs. Ramsey", ["rain80", "rain90", "rain100", "rain0", "rain10", "rain20", "rain30", "rain40", "rain50", "rain60", "rain70"], "likely"], 
    ["It will rain.", "Lily", "Mr. Tansley", ["rain100", "rain0", "rain10", "rain20", "rain30", "rain40", "rain50", "rain60", "rain70", "rain80", "rain90"], "will"],
    ["It's going to be cold.", "Meg", "Laurie", ["filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1", "filler-cold1"], "filler3"],
    ["It's going to be hot.", "Jim", "Beth", ["filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2", "filler-cold2"], "filler4"]
     ]]

];

// Fillers that set baselines in the first two trials
var basefillerList = [
["It's going to be hot.", "It's going to be cold."], ["filler-hot2", "filler-hot1"], ["Jane", "Mr. Banks"], ["Liz", "Mr. Carmichael"], ["filler1", "filler2"]
];



var data = {}; 
var trialnum = 0;
var willcount = 0;
var likecount = 0;


$(document).ready(function() {
    showSlide("intro");
    $('#gotoInstructions').click(function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide('instructions');
    });

    
    $('#startbutton').click(function() {
        var nat = document.getElementById("native").checked;
        // var spe = document.getElementById("speaker").checked;
        if (nat == true) {
        stepExperiment();
        }
        else {
            checkboxwarning = "Please check the box to confirm that you meet the necessary requirement, in order to proceed to the experiment.";
            $("#checkboxWarning").html(checkboxwarning);
        }
    });
});

function showSlide (slideName) {
    $('.slide').hide();
    $('#' + slideName).show();
}



var conditionRandom = Math.floor(Math.random() * 1);
var pictureRandom = Math.floor(Math.random() * 9);

var stimuliVector = stimuliList[conditionRandom];
var condition = stimuliVector[0];
var contextVector = shuffle(stimuliVector[1]);

var baseStimVector = basefillerList[0];
var baseContVector = basefillerList[1];
var baseName1Vector = shuffle(basefillerList[2]);
var baseName2Vector = shuffle(basefillerList[3]);
var baseTypeVector = basefillerList[4];



function stepExperiment () {
    if (trialnum == 10) { // end the experiment. 
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide("language");
        $('#lgsubmit').click(function() {
            var age = $('#ageForm').serialize();
            var gender = $('#genderForm').serialize();
            var race = $('#ethnicityForm').serialize();
			var region = $('#dialect').val();
            region = region.replace (/,/g, "");
			var region_com = $('#lang_com').val();
            region_com = region_com.replace (/,/g, "");

			//if (lang.length > 0) {

            data.age = age;
            data.gender = gender;
            data.race = race;
			data.region = region;
			data.regionComments = region_com;

			showSlide('finish');
			setTimeout(function() { turk.submit(data)}, 1000); 
                
                //} 

            } ) }
 
    else {

        trialnum += 1;
        // stimuliVector = stimuliList[conditionRandom];
        // condition = stimuliVector[0];
        // contextVector = shuffle(stimuliVector[1]);

        if (trialnum < 3) {
            sentenceStim = baseStimVector[trialnum-1];
            name1Stim = baseName1Vector[trialnum-1];
            name2Stim = baseName2Vector[trialnum-1];
            contextPic = baseContVector[trialnum-1];
            countStim = baseTypeVector[trialnum-1];
        }

        else {
            contextStim = contextVector[trialnum-3];
            sentenceStim = contextStim[0];
            name1Stim = contextStim[1];
            name2Stim = contextStim[2];
            pictureVector = contextStim[3];
            contextPic = pictureVector[pictureRandom+2];
            countStim = contextStim[4];

            //Count graded expressions
                if (countStim == "might" || countStim == "filler3" || countStim == "filler4") {
                    willcount == willcount;
                    likecount = likecount;}

                else if (countStim == "likely") {
                    likecount += 1;}

                else {
                    willcount += 1;
                    likecount = likecount;}
        }

        
               
        $(".item_number").html(trialnum);  
        $(".currentSentence").html(sentenceStim);
        $(".currentName1").html(name1Stim);
        $(".currentName2").html(name2Stim);


        
        // Tell HTML which image file will display
        document.getElementById('currentPic').src = "stimuli-pictures/" + contextPic + ".png";

        var TrueFalse = $("#TrueFalse");
        TrueFalse.html(
            TrueFalse.find("label").sort(function(){
                return Math.round(Math.random())-0.5;}));


        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide('stage'); 


        $('#continue').click(function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            var choiceResponse = $('#responseForm1').serialize();
            var sliderResponse1 = $('#sliderval1').val();

            var commentResponse1 = $('#commentBox1').val();
            commentResponse1 = commentResponse1.replace (/,/g, "");


            // Check for valid answers; all questions must be answered
            if  (slider1.style.backgroundColor != "" && choiceResponse.length > 0) {

                // make continue button available for re-use
                $("#continue").unbind('click');
                // ensure that response options are unticked for the next problems  
                $(".response").prop('checked', false);
                // ensure that the comment box is emptied as well
                $(".commentBox").val("");
                // erase warnings 
                $("#warning").html("");

              
                // Write data from collected responses
                // if (trialnum < 3) {
                //     data.fillerType = contextPic;
                //     data.baseChoice = choiceResponse;
                //     data.baseRating = sliderResponse1;
                //     data.baseComment = commentResponse1;
                // }

                // else if (trialnum = 2) {
                //     data.baseFalseC = choiceResponse;
                //     data.baseFalseR = sliderResponse1;
                //     data.baseFalseComment = commentResponse1;
                // }

                // else {
                    trial = {};
                    trial.condition = condition;
                    trial.context = contextPic;
                    trial.name1 = name1Stim;
                    trial.name2 = name2Stim;
                    trial.sentence = sentenceStim;
                    trial.stype = countStim;
                    trial.truefalse = choiceResponse;
                    trial.naturalness = sliderResponse1;
                    trial.comment = commentResponse1;
                    trial.willcount = willcount;
                    trial.likecount = likecount;

                    data["trial" + trialnum] = trial;
                // }

                // Initialize the sliders again
                refreshSlider();
            

                // Move on to the next trial
                stepExperiment();
     
                    }
            else { // If any of the questions is not answered:
                warning = "Please answer all the questions to continue. Make sure that you have dragged or clicked on the slider button so that the slider is colored and the button displays numeric values.";
                $("#warning").html(warning);
            }
        });
    }
}


// Codes for sliders
// Slider1
$( function() {
    $( "#slider1" ).slider({
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      slide: function( event, ui ) {

        $("#slider1").css({"background": "#CCFFFF"});
        $("#slider1 .ui-slider-handle").css({
                      "background": "#E0F5FF",
                      "border-color": "#001F29"
                  });

        m_val = ui.value;
        if (m_val < 0) {
            $(ui.handle).text("?");
        }
        else {
            $(ui.handle).text(m_val);
        }
        $( "#sliderval1" ).val( ui.value );
      }
    });
    $( "#sliderval1" ).val( $( "#slider1" ).slider( "value" ) );
  } );


// Function that refreshes slider values
function refreshSlider () {
    $(".sliders").slider('value', 50);
    $(".sliders").val(50);
    $(".slidervals").val(50);
    $(".ui-slider-handle").text("");
    $(".sliders").css({"background":""});
    $(".sliders" + " .ui-slider-handle").css({
        "background":"#FAFAFA",
        "border-color": "#CCCCCC" });
}


function chooseRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}


function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for (var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
}