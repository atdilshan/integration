const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Page = require("../models/pageModel");

const mainID = "7777";

// @desc    Get mypage
// @route   GET /api/mypage
// @access  Private
const myPage = asyncHandler(async (req, res) => {
  res.status(200).json(req.page);
});

// @desc    create mypage
// @route   POST /api/mypage/create
// @access  Private
const createMyPage = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      if (req.user.status == 0) {
        res.status(201).json("Your account is blocked!");
      } else {
        if (req.user.roll == 1) {
          res.status(201).json("Access Denied!");
        } else {
          if (req.user.isPage == 1) {
            res.status(201).json("You already have REON page");
          } else {
            const page = await Page.findOne({ uId: req.user.uId });
            if (page) {
              res.status(201).json("Something went wrong in create page!");
            } else {
              const { pageName, pageDescription, phone } = req.body;

              if (!pageName || !pageDescription || !phone) {
                res.status(201).json("Please add all fields");
              } else {
                // Check if page exists
                const pageExists = await Page.findOne({ phone });

                if (pageExists) {
                  res.status(201).json("Phone no already exists");
                } else {
                  const utcTimestamp = new Date().getTime();

                  // Create page
                  const page = await Page.create({
                    pId: mainID + utcTimestamp,
                    uId: req.user.uId,
                    pageName,
                    pageDescription,
                    phone,
                    link: mainID + utcTimestamp,
                    status: "1", // wait=0, active=1, block=2, active&pending=3, deleted=4
                    statusComment: "User create",
                    tempPageName: pageName,
                    tempPageDescription: pageDescription,
                    tempPhone: phone,
                    tempLink: mainID + utcTimestamp,
                  });

                  if (page) {
                    User.findOneAndUpdate(
                      { uId: req.user.uId },
                      { $set: { isPage: "1" } },
                      { new: true },
                      (err, doc) => {
                        res.status(201).json({ page });
                      }
                    );
                  } else {
                    res.status(400);
                    throw new Error("Invalid page data");
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

// @desc    Update mypage details
// @route   PUT /api/mypage/update
// @access  Private
const updateMyPage = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const { tempPageName, tempPageDescription, tempPhone, tempLink } =
        req.body;

      if (tempPageName || tempPageDescription || tempPhone || tempLink) {
        const checkPage1 = await Page.findOne({ phone: tempPhone });
        const checkPage2 = await Page.findOne({ tempPhone: tempPhone });
        const checkPage3 = await Page.findOne({ link: tempLink });
        const checkPage4 = await Page.findOne({ tempLink: tempLink });
        if (checkPage1) {
          res.status(201).json("Phone exists");
        } else {
          if (checkPage2) {
            res.status(201).json("Phone exists");
          } else {
            if (checkPage3) {
              res.status(201).json("This link already taken");
            } else {
              if (checkPage4) {
                res.status(201).json("This link already taken");
              } else {
                const updateData = {
                  tempPageName: tempPageName,
                  tempPageDescription: tempPageDescription,
                  tempPhone: tempPhone,
                  tempLink: tempLink,
                  status: "3", // wait=0, active=1, block=2, active&pending=3, deleted=4
                  statusComment: "User update page details",
                };
                const updatedMyPage = await Page.findOneAndUpdate(
                  { pId: req.page.pId },
                  updateData
                );
                if (updatedMyPage) {
                  res
                    .status(201)
                    .json(await Page.findOne({ pId: req.page.pId }));
                } else {
                  res.status(201).json("Something went wrong in update!");
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

// @desc    Delete mypage
// @route   PUT /api/mypage/delete
// @access  Private
const deleteMyPage = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const deleteData = {
        status: "4", // wait=0, active=1, block=2, active&pending=3, deleted=4
        statusComment: "User delete page",
      };
      const deletedMyPage = await Page.findOneAndUpdate(
        { pId: req.page.pId },
        deleteData
      );
      if (deletedMyPage) {
        res.status(201).json(await Page.findOne({ pId: req.page.pId }));
      } else {
        res.status(201).json("Something went wrong");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

module.exports = {
  myPage,
  createMyPage,
  updateMyPage,
  deleteMyPage,
};
