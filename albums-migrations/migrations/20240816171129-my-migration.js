module.exports = {
  async up(db, client) {
     await db.collection('Post').updateMany(
      {},
      { $set: { emoji:"nn,mnm"} }
    );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});


    await db.collection('post').updateMany({},{$set:{newField:"hgj0"}})
  }
};

