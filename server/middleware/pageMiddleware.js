const asyncHandler = require("express-async-handler");
const Page = require("../models/pageModel");

const pageProtect = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user) {
      req.page = "Please signin";
    } else {
      if (req.user.status == 0) {
        req.page = "Your account is blocked!";
      } else {
        if (req.user.roll == 1) {
          req.page = "Access Denied!";
        } else {
          if (req.user.isPage == 0) {
            req.page = "You don't have REON page";
          } else {
            const page = await Page.findOne({ uId: req.user.uId });
            if (!page) {
              req.page = "Something went wrong in get page details!";
            } else {
              if (page.status == 0) {
                req.page = "Please wait for admin approval!";
              } else {
                if (page.status == 2) {
                  req.page = "Your page is blocked!";
                } else {
                  if (page.status == 4) {
                    req.page = "Your page is deleted!";
                  } else {
                    req.page = page;
                  }
                }
              }
            }
          }
        }
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

module.exports = { pageProtect };
