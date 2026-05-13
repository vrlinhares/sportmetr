# SportMetr Website - Setup Instructions

## Quick Start

The SportMetr website is ready to use! All components are built and styled.

## Important: WhatsApp Community Link

**You need to update the WhatsApp community link before deploying:**

1. Open `/src/app/components/JoinCTA.tsx`
2. Find line 17 with the placeholder URL:
   ```javascript
   window.open('https://chat.whatsapp.com/YOUR_COMMUNITY_LINK', '_blank');
   ```
3. Replace `YOUR_COMMUNITY_LINK` with your actual WhatsApp group invite link

### How to get your WhatsApp community link:
1. Open your WhatsApp group/community
2. Tap the group name at the top
3. Scroll down and tap "Invite via link"
4. Copy the invite link
5. Paste it in the code (replace the placeholder)

## Content Customization

### Update Chapter Information
Edit `/src/app/components/Structure.tsx` to modify:
- Chapter names and locations
- Member counts
- Focus areas

### Update Events
Edit `/src/app/components/Events.tsx` to:
- Add/remove upcoming events
- Update past events
- Modify event details (date, time, location)

### Update Stats
Edit `/src/app/components/Hero.tsx` to update:
- Member count
- Number of chapters
- Number of events

### Contact Information
Edit `/src/app/components/JoinCTA.tsx` and `/src/app/components/Footer.tsx` to update:
- Email addresses
- Social media links

## Website Structure

The website consists of:

1. **Navigation** - Fixed header with smooth scrolling
2. **Hero Section** - Main landing with stats and CTA
3. **About Section** - Mission, features, and what SportMetr does
4. **Structure Section** - Network model and chapter information
5. **Events Section** - Upcoming and past events
6. **Join CTA** - Main conversion point (WhatsApp community)
7. **Footer** - Links, newsletter, and additional info

## Design Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scrolling between sections
- ✅ Active section highlighting in navigation
- ✅ Professional gradient backgrounds
- ✅ Hover effects and transitions
- ✅ Mobile-friendly navigation menu

## Deployment Checklist

Before deploying:
- [ ] Update WhatsApp community link
- [ ] Update all email addresses
- [ ] Update social media links
- [ ] Review and update chapter information
- [ ] Update upcoming events
- [ ] Verify all stats (members, chapters, events)
- [ ] Update contact information

## Future Enhancements

As mentioned in your specification, you may want to add:
- Blog/content section
- Chapter-specific pages
- Structured learning programs
- Event registration system

These can be added later as the network grows!
