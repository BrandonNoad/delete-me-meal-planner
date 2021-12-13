import { db } from 'src/lib/db';

export const teamMembers = () => {
    return db.teamMember.findMany();
};

export const TeamMember = {
    team: (_obj, { root }) => db.teamMember.findOne({ where: { id: root.id } }).team()
};
