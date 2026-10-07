const isAccountOwner = (req, res, next) => {
  const targetedUserId = req.params.postId || req.body.postId;

  if(!targetedUserId) 
  {
    return res.status(401).json({
      success: false, 
      message: "Id doesn't match"
    })
  }

  const userId = req.userId;

  if(!userId)
  {
    return res.status(401).json({ success: false, message: "userId is not defined"})
  }

  if(String(targetedUserId) != String(userId))
  {
    return res.status(403).json({
      success: false, 
      message: "not matched"
    })
  }

  console.log("kya hum yaha tak pahuch paa rahe hai ? ")
  next();
}

export default isAccountOwner;

// const isAccountOwner = (req, res, next) => {
//   const targetedUserId = req.params.id || req.body.id;

//   if(!targetedUserId) 
//   {
//     return res.status(401).json({
//       success: false, 
//       message: "Id doesn't match"
//     })
//   }

//   const userId = req.userId;

//   if(!userId)
//   {
//     return res.status(401).json({ success: false, message: "userId is not defined"})
//   }

//   if(String(targetedUserId) != String(userId))
//   {
//     return res.status(403).json({
//       success: false, 
//       message: "not matched"
//     })
//   }

//   console.log("kya hum yaha tak pahuch paa rahe hai ? ")
//   next();
// }

// export default isAccountOwner;