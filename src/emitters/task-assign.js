const EventEmitter=require('events');
const taskdata=require('../models/TaskData');
const userdata=require('../models/UserData');
const eventEmitter=new EventEmitter();
const nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    auth: {
        user: 'homems@zohomail.in',
        pass: '8943017180'
    }
});

newtask = (id)=>{
    let timer=2*60*1000;
    console.log(id);
    let count = 0;
    let timeout=0;
        var timeoutJob= setTimeout(() => {
            if(count<2)
            {
                count++;
                taskdata.findOne({_id:id}).then((data)=>{
        
                    if(data.status=="pending")
                    {
                        if(count==2)
                        {
                            data.who=data.secondary_person.person_id;
                            data.save();
                        }
                        
                        
                        taskCheck(data,count);
                    }
                    
                    timeout=calculatePriority(data.priority);
                    setInterval(()=>{
                        timeoutJob.refresh();
                    },timeout)
                });
            }
            else
            {
                clearTimeout(timeoutJob);
            }
            
            
        }, timeout);
    
    
}

function taskCheck(newTask, count) {
    if(count==1)
    {
        person=newTask.primary_person.person_name;
    }
    else if(count==2)
    {
        person=newTask.secondary_person.person_name;
    }
    else
    {
        return;
    }
    //console.log("time : "+ new Date().toLocaleString());
    
    userdata.findOne({_id:newTask.userId}).then((user)=>{
        
        
    const message = {
        from: "homems@zohomail.in",
        to: "ezcoalgaming@gmail.com",
        subject: "New Task For You",
        html: `Hi ${person},
        <br>
        <br>
        <div style="text-align:center;">
        <b>${user.name} has Assigned a New Task for You</b>
        </div>
        <div style="text-align:justify;">
        <br>
        Task:${newTask.name}
        <br>
        Description:${newTask.description}
        <br>
        prioirty : ${newTask.priority}
        <br>
        status: ${newTask.status}
        </div>`,
    };
    transport.sendMail(message, (err) => {
        if (err)
            console.log(err);
    });

    
})
}






calculatePriority=(priority)=>{
    let time;
    if(priority=="High")
    time=60*1000;
    else if(priority=="Medium")
    time=90*1000;
    else
    time=2*60*1000;

    return time;
}

eventEmitter.once('newtask',newtask);
module.exports=eventEmitter;