import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isRStudent: user.isRStudent,
      isSPStudent: user.isSPStudent,
      isGIStudent: user.isGIStudent,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Seller Token' });
  }
};
export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/Seller Token' });
  }
};

export const isRStudent = (req, res, next) => {
  if (req.user && req.user.isRStudent) {
    next();
  } else{
    res.status(401).send({message: 'Invalid R Students token'});
  }
};

export const isSPStudent = (req, res, next) => {
  if (req.user && req.user.isSPStudent) {
    next();
  } else{
    res.status(401).send({message: 'Invalid SPSS Students token'})
  }
};

export const isGIStudent = (req, res, next) => {
  if (req.user && req.user.isGIStudent) {
    next();
  } else{
    res.status(401).send({message: 'Invalid GIS Students token'});
  }
};

export const isRStudentOrGIStudentOrSPStudent = (req, res, next) => {
  if (req.user && (req.user.isRStudent || req.user.isSPStudent || req.user.isGIStudent)) {
    next();
  } else{
    res.status(401).send({message: 'Invalid RStudents/SPSS/GIS token'});
  }
};




export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Download is Ready</h1>
  <p>
  Hi ${order.user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>
    <a href=${item.image} download><strong>Download ${item.name}</strong></a>
    </td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> <del>&#8358;</del>${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  </table>
  <h3>User Details</h3>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address}<br/>
  </p>
  <hr/>
  <p>
  Thanks for visiting our site.
  </p>
  `;
};


export const newUserEmailTemplate = (user) => {
  return `<h1>Welcome to Niger Maps</h1>
  <p>
  Hi ${user.name},</p>
  <p>
  Thanks for Registering.
  </p>
  `;
};