const User = require("../models/user");
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
const _ = require('lodash');
const { check, validationResult } = require("express-validator");
const {OAuth2Client} =require('google-auth-library')

sgMail.setApiKey("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");
const client=new OAuth2Client("973567937994-u306n61sqv26l9dvakftoq480senggqa.apps.googleusercontent.com")
exports.signup = (req, res) => {
  

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors,
    });
  }
  
     User.findOne({email:req.body.email})
     .then(user=>{
       if(user)
       {
         console.log("jnn")
         res.status(400).json({
           err:"User already exists!"
         })
         return;
       }
       else{



         const {email}=req.body
      
     
         const token=jwt.sign(req.body,process.env.ACTIVATION_TOKEN_SECRET,{
              expiresIn:'5m'
            });
            
            const mail ={
              to:email,
              from:process.env.SENDGRID_SENDER_EMAIL,
              subject: 'Verify and Activate your account at Laptopshop!',
              text: 'Click on the below link to activate your account',
              html: `<h1>Please use the following to activate your account</h1>
                     <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                     <hr/>
                     <p>This email may containe sensetive information</p>
                     <p>${process.env.CLIENT_URL}</p>`
            }

            sgMail.send(mail)
            .then(sent=>{
              res.json({
                message:"Sent successfully",
                user:req.body
              })
            })
            .catch(err=>{
              console.log(err.message)
              res.json({
                err:"Failes in sending mail"
              })
              console.log("error in sending mail  "+err)
            })






       }
     })
     .catch(err=>{
       console.log(err.message)
       res.json({
         err:"Error in Signup!"
       })
     })
     

     
  // const user = new User(req.body);



};


exports.activation_handler=(req,res)=>{
const {token}=req.body;

if(token)
{
  jwt.verify(token,process.env.ACTIVATION_TOKEN_SECRET,(err,user)=>{
    if(user)
    {
      const newuser=new User(user);
      
  newuser.save((err, user) => {
    if (err) {
      // console.log(err.message)
      return res.status(400).json({
        err: "User already exist!",
      });
    }
    res.json({
      message:"Successflly Signedup!",
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
    });
    }
    else{
      
      res.status(500).json({
        err:"Please try again"
      })
    }
  })
  
}
else{
  console.log('token in null');
  res.status(400).json({
    err:'Registration failed ! please try again',
  })
}


}






exports.signin = (req, res) => {
  console.log("hey");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors,
    });
  }
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          err: "error in finding a user",
        });
      }

      if (!user) {
        return res.status(400).json({
          err: "User with this email is not exists",
        });
      }
      if (!user.authenticate(req.body.password)) {
        return res.json({
          err: "Email and password doesnt match",
        });
      }
      var token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET
      );
      res.cookie("token", token, {
        maxAge: 55500000,
      });
    

      //send response

      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    }
  );
};







exports.forgetPasswordhandler=(req,res)=>{

  console.log('heelo')
    const {email}=req.body;
    const errors=validationResult(req);


    if(!errors.isEmpty())
    {
      const firstError=errors.array().map(error => error.msg)[0] +" at "+ errors.array().map(error=>error.param);
      res.status(400)
      .json({
        err:firstError,
      })
      
      
    }
    else{
      User.findOne({email:email})
      .then(user=>{
        if(!user)
        {
          res.json({
            err:'User with this email does not exist',
          })
        }
        else{

          const token=jwt.sign({_id:user._id},process.env.RESET_PASSWORD_TOKEN,{
            expiresIn:'5m',
          })
             const mail ={
              to:email,
              from:process.env.SENDGRID_SENDER_EMAIL,
              subject: 'Forget Password for LaptopShop ?',
              text: 'Click on the below link to reset your password',
              html: `<h1>Please use the following to reset your password</h1>
                     <p>${process.env.CLIENT_URL}/users/reset/password/${token}</p>
                     <hr/>
                     <p>This email may containe sensetive information</p>
                     <p>${process.env.CLIENT_URL}</p>`
            }

            sgMail.send(mail)
            .then(sent=>{
              res.status(200)
              .json({
                message:"Email Sent Successfully!"
              })
            })
            .catch(err=>{
              console.log("email not send")
              res.status(500)
              .json({
                err:'Something Went wrong! Email not send'
              })

            })

        }

      })
      .catch(err=>{
        console.log(err.message)
        res.status(500).json({
          err:'Something Went worng! Please try again'
        })

      })
    }
  }












exports.resetPasswordHandler=(req,res)=>{

  const errors=validationResult(req);
    if(!errors.isEmpty())
    {
      const firstError=errors.array().map(error => error.msg)[0] +" at "+ errors.array().map(error=>error.param);
     return res.status(400)
      .json({
        err:firstError,
      })
      
      
    }
    else{
      const {password,token}=req.body;
      
      jwt.verify(token,process.env.RESET_PASSWORD_TOKEN,(err,userId)=>{

         if (err) {
          return res.status(400).json({
            error: 'Expired link. Try again'
          });
        }
        else{

            User.findOne({_id:userId})
            .then(user=>{
              if(!user)
              {
                res.status(400).json({
                  err:"User does not exist!"
                })
              }
              else{

                user = _.extend(user, {password});
                user.save()
                .then(user=>{
                 
                  res.status(200).json({
                    user:user,
                    message:"Your password has been reset successfully! "
                  })

                })
                .catch((err) => {
                    res.status(500)
                    .json({
                      err:'Something went wrong !please try again'
                    })
                })

              }


            })
            .catch((err) => {
              console.log(err)
                res.status(500).json({
                  err:"Something went wrong"
                })
            })

        }

      })


    }


}



exports.googleController=(req,res)=>{
  const {idToken}=req.body
  console.log(req.body)
  client
    .verifyIdToken({ idToken, audience: "973567937994-u306n61sqv26l9dvakftoq480senggqa.apps.googleusercontent.com" })
    .then(response=>{
      const {email,email_verified,name}=response.payload
      console.log(response.payload)
      if(email_verified)
      {
        User.findOne({email})
        .then(user=>{
          if(user)
          {
            var token = jwt.sign({id :user._id},process.env.SECRET);
          
        
     
          res.cookie("token", token, {
            maxAge: 55500000,
          });
    

      //send response

          const { _id, name, email, role } = user;

          return res.status(200).json({
            
            token,
            user: {
              _id,
              name,
              email,
              role,
            },
          });

         }
          else{
            let password=email+process.env.SECRET
            var newUser=new User({email,name,password})
            newUser.save()
            .then(user=>{

            jwt.sign({_id:user._id}, process.env.SECRET, (err, token) => {
              if (err) {
               return res.status(400).json({
                error: "Error in signin! please try again.",
              });
             } 
           else {

            var token = jwt.sign({id :user._id},process.env.SECRET);
          
            res.cookie("token", token, {
              maxAge: 55500000,
            });
      

      //send response

          const { _id, name, email, role } = user;

          return res.status(200).json({
           
            token,
            user: {
              _id,
              name,
              email,
              role,
            },
          });









         }
         });
            })
            .catch((err) => {
                console.log("here3 ",err)
              res.status(400).json({
                error:"Failed to signin with google"
              })
            })
              //ends here
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(400).json({
          error:"Signin with google failed"
        })
        })
      }
      else{
        console.log("here ",err)
        res.status(400).json({
          error:"Signin with google failed"
        })
      }
    })
    .catch(err=>{
        console.log("here2 ",err)
      res.status(400).json({
          error:"Signin with google failed"
        })
    })
 
}








exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    msg: "User signOut success",
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.user && req.profile._id == req.user.id;

  if (!checker) {
    return res.status(403).send("ACCESS DENIED");
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).send("ACCESS DENIED NO ADMIN");
  }
  next();
};
