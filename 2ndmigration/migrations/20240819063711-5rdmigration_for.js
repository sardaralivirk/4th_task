module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    
    await db.collection('posts').updateMany(
      {},
      { $set: { comments:"nn,mnm"} }
    )
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example: const id=req.body;
  
    await db.collection('posts').updateMany({_id:"66c2e5e6e938a9a6308d162a"},{$unset:{comments:""}})
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
