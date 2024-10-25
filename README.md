# Wishly
### Description
We often find it difficult to remember memorable occasions such as birthdays, anniversaries, etc. Wishly is here to address that. Wishly lets you record these memorable days and will automatically send you an email reminder to remind you about the same.

### Features
- Automatic Email Reminders: Wishly will send you email reminders for your recorded events, ensuring you never miss a special occasion.

- Customizable Reminder Frequency: You can alter the frequency of the reminders to suit your preferences.

- Multiple Email Linking: Link several emails to a single account, making it easy to send reminders to your entire family or group.

- Event Notifications Control: Turn off notifications for certain events if you do not want to receive reminders for them.

- Event Categorization: Assign categories to events, greatly simplifying event management.

- User-Friendly UI: An attractive and minimal UI ensures an enjoyable user experience.


### Inorder to test the application locally:
1. Clone the repository: `git clone https://github.com/actuallyakshat/wishly.git`
2. Install dependencies: `pnpm install`
3. Set Environment Variables:
     ```
     DATABASE_URL=
     MAIL_PASS=
     MAIL_USER=
     MAIL_HOST=
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=
     ```
4. Migrate Prisma Scehmas: `pnpm dlx prisma migrate dev --name migration_name` and then `npx prisma generate`  
5. Run the local server: `pnpm dev`

### Tech Stack Used
- Next.js
- Typescript
- Clerk Auth
- Nodemailer
- Prisma
- Cron Jobs
- ShadCN UI

### Have any queries?
Feel free to contact me on LinkedIn or Instagram! You can find the link to my socials from my GitHub Profile.
