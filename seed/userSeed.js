const { User } = require('../server/db/models')

User.create({email: 'hello@good.bye', password: 'hellohello'})

User.create({email: 'a@a.a', password: 'a'})

User.create({email: 'b@b.b', password: 'b'})
