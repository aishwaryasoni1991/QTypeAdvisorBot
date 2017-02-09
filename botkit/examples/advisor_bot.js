/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Send a message with attachments
* Send a message via direct message (instead of in a public channel)

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node demo_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "Attach"

  The bot will send a message with a multi-field attachment.

  Send: "dm me"

  The bot will reply with a direct message.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//var cleverbot = require("cleverbot.io"),  
//cleverbot = new cleverbot('PQb8rZRsnKegzxDm', 'x71WfUOpJY99NY2EnpOiTzMEB68bdOWd');  // API user and API key
//cleverbot.setNick("biggie");  
//cleverbot.create(function (err, session) {  
//    if (err) {
//        console.log('cleverbot create fail.');
//    } else {
//        console.log('cleverbot create success.');
//    }
//});


var Botkit = require('../../botkit');
// wit.ai token
process.env.wit='I5LOD7D6AG2GMA3UYCK2GSACPBXEADZA';
var wit = require('botkit-middleware-witai')({
  token: process.env.wit
});


//var process_file= require('process');
//console.log(process_file);
//var witbot=process_file.Witbot(process.env.wit);

// console.log(witbot);

if (!process.env.wit) {
  console.log('Error: Specify wit server token in environment')
}

process.env.token='xoxb-76071313888-qb4b6ErFzUzTbYcVjxxABpmx';
if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});  


controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});


// enable witai middleware
controller.middleware.receive.use(wit.receive);

// stopConv=function(response,convo){
//   console.log('in stop');
// controller.hears('no','direct_message',function(bot,message) {
//   bot.reply(message,'Goodbye');
//   bot.rtm.close();
// });
// }

controller.hears(['hello'], 'direct_message', wit.hears, function(bot,message) {
	   // bot.reply(message,"Hello. Do you have any questions for me");
	    
	 // start a conversation to handle this response.
		
		//bot.reply(message, 'test success');
	  bot.startConversation(message,hiResponse);
	});

controller.hears(['bye'],'direct_message', wit.hears, function(bot,message) {
  bot.reply(message,'Thank you.');
  bot.reply(message,'Have a great day ahead ! ');
  bot.rtm.close();
});


controller.hears(['ABBR'], 'direct_message', wit.hears, function(bot, message) {
  bot.reply(message,"Question type ABBR detected.");
});

controller.hears(['ENTY'], 'direct_message', wit.hears, function(bot, message) {
  bot.reply(message,"Question type ENTY detected.");
});

controller.hears(['HUM'], 'direct_message', wit.hears, function(bot, message) {
  bot.reply(message,"Question type HUM detected.");
});


// controller.hears(['test'],['direct_message','direct_mention','mention'], function(bot,message) {
//      // bot.reply(message,"Hello. Do you have any questions for me");
      
//    // start a conversation to handle this response.
    
//       bot.reply(message,'test');   
//       bot.startConversation(message,hiResponse);
//   });


controller.hears(['schedule'], ['direct_message','direct_mention','mention'], wit.hears, function(bot,message){
  //bot.reply('We can help you with scheduling appointment! ');

bot.startConversation(message,scheduleAppointment);
});

controller.hears(['disqualify'], ['direct_message','direct_mention','mention'], wit.hears, function(bot,message){
  //bot.reply('We can help you with scheduling appointment! ');

bot.startConversation(message,disqualificationFromUniversity);
});


hiResponse=function(response,convo){
//   controller.hears(['schedule,book'], ['direct_message','direct_mention','mention'], wit.hears, function(bot,message){
//   bot.reply('We can help you with scheduling appointment! ');

// bot.startConversation(message,scheduleAppointment);
// });
	convo.ask('Hello. Do you have any questions for me? Please respond with "yes" or "no".',function(response,convo){
		if (response.text=='yups'|| response.text=='sure' || response.text.toLowerCase().match(/.*ye*./)) {
      convo.say('Awesome!');
      askQuestion(response,convo);

     // convo.next();

    }

    // response.text.toLowerCase().match(/.*no*./)
   else if (response.text=='no' || response.text=='nope' ||response.text=='nay' ||  response.text.toLowerCase().match(/.*have[^n][^n]/)) {
      convo.say('OK!');
      needAssistance(response,convo);
     // convo.next();
    
    }
    else {
     convo.say('I am sorry.I cannot understand your response.');
     convo.repeat();
    }
    convo.next();
	});
}

askQuestion=function(response,convo) {
  convo.say('These are the questions that I can answer for you.');
  convo.say('1. Schedule Appointment');
  convo.say('2. Disqualification Information');
  //var response_flag=false;

	convo.ask('Please choose any one option. Please say "quit" to exit', function(response,convo){
    // console.log(response.text);
    

    // ll=wit.process(response.text);
    
    // console.log('ll is : '+ll.hears);
    //       ll.hears('schedule', 0.5, function (outcome) {
    //         convo.say('I am so glad to hear it!');
    //         convo.next();
    //       })
    //       .otherwise(function (outcome) {
    //         convo.say('I\'m cofused')
    //         convo.repeat()
    //         convo.next()
    //       })
//     wit.process(['schedule ['direct_message','direct_mention','mention'], function(bot,message){
//   //bot.reply('We can help you with scheduling appointment! ');
// response_flag=true;
// bot.startConversation(message,scheduleAppointment);
// });

	//controller.hears
  if (response.text=='1'){
    convo.say('OK!');
    scheduleAppointment(response,convo);
    //convo.next();
  
	}
  else if (response.text=='2') {
    convo.say('OK!');
    disqualificationFromUniversity(response,convo);

  }
  else if (response.text=='quit'){
    needAssistance(response,convo);
  }
  else{
    //convo.say('I am sorry.')
   // wrongQuestion(response,convo);
    convo.say('I am sorry.I cannot understand your response.');
    convo.repeat();
  }
	convo.next();
});
}



disqualificationFromUniversity=function(response,convo){
convo.say('These are the questions related to Disqualification.');
var one ='1. What is disqualification from the university?';
var two='2. How can I put forward a petition for it?';
var three ='3. Can I get back into the major after I have been disqualified?';
var four='4. What is academic probation?';
var five ='5. How does it differ from disqualification from the major?';
convo.say(one);
convo.say(two);
convo.say(three);
convo.say(four);
convo.say(five);

convo.ask( 'Please say the question number you want to get answered. Please say "change question" to get list of categories of questions. Please say "quit" to exit.',function(response,convo){

if (response.text=='1') {
  optionOne(response,convo);
  convo.repeat();
 // convo.ask('Please say the ');
}
else if (response.text=='2'){
  optionTwo(response,convo); 
  convo.repeat(); 

}
else if (response.text=='3') {
optionThree(response,convo);
convo.repeat();
}
else if (response.text=='4') {
optionFour(response,convo);
convo.repeat();
}
else if (response.text=='5') {
optionFive(response,convo);
convo.repeat();
}

else if (response.text=='quit') {
needAssistance(response,convo);

}
else if (response.text=='change question'){
askQuestion(response,convo);
}
else {
  convo.say('I am sorry.I cannot understand your response.');
  convo.repeat();
}
convo.next();
});

  convo.next();
}

optionOne=function(response,convo){
  convo.say('An undergraduate student whose SJSU GPA falls too far below 2.0 is subject to disqualification from the university.\
 The university\'s policy on disqualification is given in the university catalog (follow the Undergraduate Information and Requirements | Disqualification and Probation - Undergraduate & Postbaccalaureate | Disqualification, Academic links)\
    ');
  convo.say('Click on this link to go to university catalog [http://info.sjsu.edu/static/catalog/policies.html]');
  convo.say('If you are disqualified from SJSU, then you are no longer enrolled at SJSU, although you may petition for reinstatement.\
 Disqualified students are eligible to take courses through Open University.');
  convo.say('Click on this link to get information about open university [http://www.sjsu.edu/openuniversity/?utm_source=CirculationMgmt&utm_medium=StreetRacks&utm_campaign=Fall2016OpenUniversity/]');
  convo.next();
}
optionTwo=function(response,convo){
  convo.say('For information about petitioning for reinstatement, check the Office of the Registrar. ');
  convo.say('Please click on this link to go to the Office of the Registrar [http://www.sjsu.edu/registrar/students/reinstatement/index.html]');
  convo.say('Reinstatement is not automatic.  Petitioners generally need to demonstrate that they are capable of succeeding in university level work.\
 Except for the occasional hardship case, this is done simply by raising one\'s SJSU GPA back to 2.0. ');
  convo.next();

}
optionThree=function(response,convo){
convo.say('Note that if you are disqualified from the university, then you are no longer enrolled in any major. If you become eligible for reinstatement,\
 you must reapply to the university. You may reapply in a different major than your original major.');
convo.say('Reinstatement into the computer science major for disqualified students is subject to the same requirements as for ordinary changes of major,\
 and is very unlikely to be possible in the near future.');
convo.next();

}

optionFour=function(response,convo){
convo.say('Academic probation is a first step toward disqualification from the university.  The relevant SJSU policy is given in the university catalog (follow the Undergraduate Information and Requirements |\
 Disqualification and Probation - Undergraduate & Postbaccaluareate | Probation, Academic links).');
convo.say('Click on this link to go to university catalog [http://info.sjsu.edu/static/catalog/policies.html] ');
convo.say('Every semester, a registration hold is placed on all students on academic probation.  For information about removing this hold,\
 and for general advising information related to probation, see the question on removing advising and probation holds.');

convo.next();
}

optionFive=function(response,convo){
  convo.say('Effective Fall 2014, Computer Science majors are now subject to disqualification from the major and probation in the major.\
 The policy in both cases is that of the College of Science.');
  convo.say('Click on this link to read or download the policy [http://www.sjsu.edu/science/students/Updated%20CoS%20Probation%20Policy.pdf]');
  convo.say('The university policy on disqualification from the major is given in the university catalog, under the Policies and Procedures heading\
 (follow the Undergraduate Information and Requirements | Disqualification and Probation - Undergraduate & Postbaccaluareate |  Disqualification -- Major links). ');
  convo.say('Click on this link to go to university catalog [http://info.sjsu.edu/static/catalog/policies.html] ');

  convo.say('Again, reinstatement into the computer science major for disqualified students is subject to the same requirements as for ordinary changes of major,\
 and is very unlikely to be possible in the near future.');
 convo.say('Click on this link to read the computer science change of major policy [http://www.sjsu.edu/cs/practicalities/major-change/] ');

  convo.next();

}

scheduleAppointment=function(response,convo){
  convo.say('All students in the College of Science will have an advising hold placed on MySJSU each semester.\
 You must contact your assigned advisor in order to have the hold removed and be cleared to register for classes.');
  convo.say('Exception: Students currently declared as Biology, Chemistry, or Computer Science major who are interested in changing out of their major do not need to schedule an appointment.\
 Instead you should meet with your new intended major advisor and provide signed proof of advising to the CoSAC front office in DH 211 for hold removal.');
  

  convo.ask('Do you want to change your major? Please say "yes" to get the change of major link or Please say "no" to choose a major for scheduling appointment.\
  Please say "change question" to get list of categories of questions. Please say "quit" to exit',function(response,convo){
    if (response.text=='yups'|| response.text=='sure' || response.text.toLowerCase().match(/.*ye*./)) {
      convo.say('Please click on this link [http://www.sjsu.edu/cosac/declare/index.html]');
      convo.ask('Do you want to schedule any other appointment? Please say "yes" or "no".\
 Please say "change question" to get list of categories of questions. Please say "quit" to exit.',function(response,convo){
        if (response.text=='yups'|| response.text=='sure' || response.text.toLowerCase().match(/.*ye*./)) {
          scheduleAppointment(response,convo);
        }
        else if (response.text=='nay' ||  response.text.toLowerCase().match(/.*no*./)) {
          needAssistance(response,convo);
        }
        else if(response.text=='quit'){
        needAssistance(response,convo);
      }
      else if (response.text=='change question'){
        askQuestion(response,convo);
      }
        else {
          convo.say('I am sorry.I cannot understand your response.');
          convo.repeat();
        }
        convo.next();
      });


     // anyMoreQuestions(response,convo);
    }
   else if (response.text=='nay' ||  response.text.toLowerCase()=='no'|| response.text.toLowerCase()=='nope')  {

      choosingMajor(response,convo);
    }
  else if(response.text=='quit'){
    needAssistance(response,convo);

  }
   else if (response.text=='change question'){
        askQuestion(response,convo);
      }
    else {
     convo.say('I am sorry.I cannot understand your response.');

      convo.repeat();
     // convo.next();

    }
    convo.next();

  });

  
//convo.next();
}


choosingMajor=function(response,convo){
convo.say('OK!');
convo.ask('What Type of Advising Appointment Do You Want To Schedule? Please choose among the following options-> "General Education", "Major", "Minor".\
 Please say "change question" to get list of categories of questions. Please say "quit" to exit', function(response,convo){
         
    if (response.text=='General Education' || response.text=='Major' || response.text=='Minor'){
   
    advisingType(response,convo);
    convo.next();  
   }
   else if(response.text=='quit'){
    needAssistance(response,convo);

  }
   else if (response.text=='change question'){
        askQuestion(response,convo);
      }
   else {
    
    wrongSchedule(response,convo);
    convo.next();
   }
   convo.next();

  });
}

advisingType=function(response,convo){
 // var bool =false;
  convo.say('OK!');

  if (response.text=='General Education'){
    convo.say('For General Education advising, please schedule an appointment with Colleen Chon on [https://booknow.appointment-plus.com/3p03txxx/] ');
   // convo.say('Thank you for your questions.')
   anyMoreQuestions(response,convo);
   
  }
 else if(response.text=='Major'){
   
    majorAdvising(response,convo);
   
  
  }

 else if (response.text=='Minor'){
    minorAdvising(response,convo);
    
  }
  
  else {
   convo.say('I am sorry.I cannot understand your response.');
    wrongSchedule(response,convo);
  }
  
  // else{

  //   convo.say('Please say quit to stop scheduling the appointment');
  //   //convo.next();

  //   // if(response.text=='quit'){
  //   //   convo.stop();

  //   // }
  //   // else {
  //   //   wrongSchedule(response,convo);
  //   //   convo.next();

  //   // }
  // }
  convo.next();
}


majorAdvising=function(response,convo){
  var bool =false; // to restrict to code to goto else

 convo.ask('Please choose a major from Biology, BA Chemistry, Chemistry, Computer Science,\
 Geology, Mathematics/Statistics, Meteorology and Climate Science, Physics and Astronomy, Science Education. To change the appointment type please say "change advising type".\
 Please say "change question" to get list of categories of questions. Please say "quit" to exit\n',function(response,convo){
   if(response.text=='quit'){
      bool =true;
      needAssistance(response,convo);
    }
      if(response.text=='Biology'){
        
        convo.say('OK!');
        convo.say('Please goes to the following link to browse the Biology department [http://www.sjsu.edu/cosac/current_students/advising/biology_major_advising/]');
        convo.say('Biology students (ALL majors) who HAVE NOT yet completed Biol 31 or Biol 1B and Chem 1B with a \
"C" or better (including Freshman, Remedial, and Transfers) should meet with Dr. Jamie Alea [https://booknow.appointment-plus.com/3p03txxx/]');
        convo.say('All Biology students who HAVE completed Biol 31 or Biol 1B and Chem 1B and received a grade of "C" or better \
should contact your faculty advisor. Click here [http://www.sjsu.edu/biology/undergraduate-programs/advising/index.html#WhoAdvisor] for the list of Biology faculty advisors.');
        convo.say('If you are interested in declaring a Biology major, do not schedule an appointment, \
please click here for more information [https://booknow.appointment-plus.com/3p03txxx/]');
        
       // convo.say('Thank you for your questions. Have a great day ahead!');

        bool =true;
        anyMoreQuestions(response,convo); 
      }
      if (response.text=='BA Chemistry') {
          convo.say('Your advisor is Randall Radcliff. Click on this link to schedule an appointment [https://booknow.appointment-plus.com/3p03txxx/]');
          bool=true;
          anyMoreQuestions(response,convo);
      }

      if(response.text=='Chemistry'){
        convo.say('Please goes to the following link to browse the Chemistry department [http://www.sjsu.edu/cosac/current_students/advising/chemistry_major_advising/]');
        convo.say('Chemistry students (ALL concentrations) who HAVE NOT completed Chem 113A you will need to schedule an appointment with Randall Radcliff on this link \
[https://booknow.appointment-plus.com/3p03txxx/]');
        convo.say('All Chemistry students who HAVE completed Chem 113A and received a "C" or better should contact your faculty advisor. Click here for the list of Chemistry faculty advisors.\
[http://www.sjsu.edu/chemistry/Academic_Programs/Undergraduate_Programs/index.html]');
        convo.say('If you are interested in declaring a Chemistry major, do not schedule an appointment, please click here for more information [http://www.sjsu.edu/cosac/prospective_students/declaring_cos_major/]');
      
      // convo.say('Thank you for your questions. Have a great day ahead!');
      anyMoreQuestions(response,convo);
       bool =true;
      }
      if(response.text=='Computer Science'){
        convo.say('Please goes to the following link to browse the Compuer Science department [http://www.sjsu.edu/cosac/current_students/advising/computer_science_major_advising/]');
        convo.say('Computer Science students who HAVE NOT completed CS 146 with a grade of "C-" or better should schedule an appointment to meet with Colleen Chon or Josue Alcaraz. \
If you have completed above 30 units please schedule with Josue Alcaraz. If you have completed less than 30 units please schedule with Colleen Chon. Please click on this link for \
booking appointment [https://booknow.appointment-plus.com/3p03txxx/]' );
        convo.say('If you are interested in declaring a Computer Science major, do not schedule an appointment, please click here for more information [https://booknow.appointment-plus.com/3p03txxx/]');
       
      //  convo.say('Thank you for your questions. Have a great day ahead!')
        bool =true;
        anyMoreQuestions(response,convo);
      }
      if (response.text=='Geology'){
        convo.say('Please contact the Geology Department, or your assigned faculty advisor. [http://www.sjsu.edu/geology/]');
        
       // convo.say('Thank you for your questions. Have a great day ahead!')
        bool =true;
        anyMoreQuestions(response,convo);

      }
      if(response.text=='Mathematics/Statistics'){
        convo.say('Please contact the Department of Mathematics, or your assigned faculty advisor on this link [http://www.sjsu.edu/math/]');
       
       //convo.say('Thank you for your questions.')
        bool =true;
        anyMoreQuestions(response,convo);
      }
      if(response.text=='Meteorology and Climate Science'){
        convo.say('Please contact the Department of Meteorology and Climate Science, or your assigned faculty advisor on this link [http://www.sjsu.edu/meteorology/]');
       //convo.say('Thank you for your questions. Have a great day ahead!')
        bool =true;
        anyMoreQuestions(response,convo);

      }
      if(response.text=='Physics and Astronomy'){
        convo.say('Please contact the Department of Physics and Astronomy, or your assigned faculty advisor on this link [http://physics.sjsu.edu/]');
        //convo.say('Thank you for your questions. Have a great day ahead!')
       
       bool =true;
       anyMoreQuestions(response,convo);

      }
      if(response.text=='change advising type'){
        bool =true;
        wrongSchedule(response,convo);
              
      }
      if (response.text=='Science Education') {
          convo.say('Click on this link for the Science Education Programs [http://www.sjsu.edu/scied/]');
          bool=true;
          anyMoreQuestions(response,convo);
      }
      if (response.text=='change question'){
        bool=true;
        askQuestion(response,convo);
      }
      if(bool==false){
        convo.say('I am sorry.I cannot understand your response.');
        convo.say('Please choose the correct department');
        majorAdvising(response,convo);
       
      }
    convo.next();
    });
  
}

needAssistance=function(response,convo){
convo.say('Thank you for your questions. Have a great day ahead!');
convo.say('If you need assistance, please call our College of Science Advising Center receptionist at 408-924-5193 or visit us in DH 211 during office hours.');
convo.next();
}

// when a user chooses minor as option
minorAdvising=function(response,convo){

convo.say('For minor in Chemistry, go to [http://www.sjsu.edu/cosac/current_students/advising/chemistry_minor_advising/]');
convo.say('If you are a BS Biological Science major with a concentration in Microbiology, Molecular Biology, or Systems Physiology, \
  your Chemistry minor occurs automatically and you do not need to declare the minor. You will need to complete the Chemistry Minor Form for Biological Sciences Major ONLY. \
Click on this link to access the form [http://www.sjsu.edu/chemistry/docs/Chemistry_Minor_Form_Biology.pdf] \
Please complete this form, attach your unofficial transcripts, and submit the information to the CoSAC front office in DH 211. \
You do not need an appointment to obtain the Chemistry Minor Advisor\'s signature. When your Chemistry Minor form has been approved and signed, \
you will be notified by email and you will pick up your Chemistry minor Form in the Biology Department office "(DH 254)".');

convo.say('All other majors must complete the appropriate Change of Major/Minor form depending if you are above or below 90 unit and complete the Chemistry Minor Form for Non-Biological Sciences ONLY. \
Click on this link to access the form [http://www.sjsu.edu/chemistry/docs/Chemistry_Minor_Form_Biology.pdf] \
The requirements for the Chemistry Minor are outlined in the University Catalog. Click on this link to get the University Catalog [http://info.sjsu.edu/web-dbgen/catalog/departments/CHEM-section-4.html].\
Please complete both forms, attach your unofficial transcripts, \
and submit the information to the CoSAC front office in DH 211. When your Chemistry Minor form has been approved and signed, \
you will be notified by email. An appointment with with the Chemistry Minor Advisor is NOT required unless you need advisement regarding \
Chemistry minor course selection.The change of Major form is available at [http://www.sjsu.edu/registrar/forms/index.html#c]');
anyMoreQuestions(response,convo);
convo.next();
}



wrongQuestion=function(response,convo){
convo.ask('Do you want to schedule an appointment? Please respond with "yes" or "no".\
 Please say "change question" to get list of categories of questions. Please say "quit" to exit.',function(response,convo){

if (response.text=='yups'|| response.text=='sure' || response.text.toLowerCase().match(/.*ye*./)) {
  
  scheduleAppointment(response,convo);
  //convo.next();
   
}

else if (response.text=='nay' ||  response.text.toLowerCase().match(/.*have[^n][^n]/) || response.text.toLowerCase().match(/.*no*./)) {
  //convo.say('Thank you for your questions. Have a great day ahead!');
  needAssistance(response,convo);
}
else if (response.text=='change question'){
        askQuestion(response,convo);
      }

else if(response.text=='quit'){
      convo.say('Thank your for your questions. Have a great day ahead!');
     
    }

else {
   
    convo.say('I am sorry.I cannot understand your response.');
    wrongQuestion(response,convo);
   // convo.next();
   }
   convo.next();
});


}

// If a user chooses wrong option in scheduling
wrongSchedule=function(response,convo){

convo.ask('Please respond with options such as General Education, or Major, or Minor.\
 Please say "change question" to get list of categories of questions. Please say "quit" to exit',function(response,convo){
      if (response.text=='General Education' || response.text=='Major' || response.text=='Minor'){
     
      advisingType(response,convo);
 

    } 
   else if(response.text=='quit'){
      convo.say('Thank your for your questions. Have a great day ahead!');
     
    }
    else if (response.text=='change question'){
        askQuestion(response,convo);
      }
    else {
      convo.say('I am sorry.I cannot understand your response.');
      wrongSchedule(response,convo);
   
    }
     convo.next();
      });
}

// If any further questions are needed to be asked, go back to choosing majot function or else quit
anyMoreQuestions=function(response,convo){
convo.ask('Do you want to schedule any other appointment? Please say "yes" or say "quit" to exit.\
 Please say "change question" to get list of categories of questions',function(response,convo){
//convo.say('');
if (response.text=='yups'|| response.text=='sure' || response.text.toLowerCase().match(/.*ye*./)) {
  choosingMajor(response,convo);
}
else if (response.text=='change question'){
        askQuestion(response,convo);
      }

else if (response.text=='quit') {
  needAssistance(response,convo);
}
else {
  anyMoreQuestions(response,convo);
}
convo.next();
});
}

controller.hears(['attach'],['direct_message','direct_mention'],function(bot,message) {

  var attachments = [];
  var attachment = {
    title: 'This is an attachment',
    color: '#FFCC99',
    fields: [],B
  };

  attachment.fields.push({
    label: 'Field',
    value: 'A longish value',
    short: false,
  });

  attachment.fields.push({
    label: 'Field',
    value: 'Value',
    short: true,
  });

  attachment.fields.push({

    label: 'Field',
    value: 'Value',
    short: true,
  });

  attachments.push(attachment);

  bot.reply(message,{
    text: 'See below...',
    attachments: attachments,
  },function(err,resp) {
    console.log(err,resp);
  });
});

controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
	
	bot.startConversation(message,function(err,convo) {
    convo.say('Heard ya');
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say('Private reply!');
  });

});
