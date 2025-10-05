# Contributing to SwapCycle

Thank you for considering contributing to SwapCycle! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested in Issues
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/swapcycle.git
   cd swapcycle
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

5. **Test your changes**
   ```bash
   # Backend tests
   cd server
   npm test
   
   # Frontend tests
   cd client
   npm test
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve issue with..."
   ```

   **Commit Message Format:**
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Link related issues

## Development Guidelines

### Code Style

**JavaScript/React:**
- Use ES6+ features
- Use functional components and hooks
- Keep components small and focused
- Use meaningful variable names
- Add PropTypes for component props

**CSS/Tailwind:**
- Use Tailwind utility classes
- Keep custom CSS minimal
- Maintain responsive design
- Follow mobile-first approach

**Backend:**
- Use async/await for asynchronous code
- Add proper error handling
- Validate all inputs
- Add comments for complex logic
- Keep functions small and focused

### File Structure

- Place components in appropriate folders
- Keep related files together
- Use index files for cleaner imports
- Follow existing naming conventions

### Testing

- Write unit tests for utilities
- Write integration tests for API routes
- Test edge cases and error conditions
- Ensure all tests pass before PR

### Documentation

- Update README for new features
- Add JSDoc comments for functions
- Update API documentation
- Include examples where helpful

## Project Structure Best Practices

### Frontend (React)

```
src/
├── components/       # Reusable components
│   ├── common/      # Shared components
│   └── layout/      # Layout components
├── pages/           # Page components
├── services/        # API services
├── context/         # React context
├── hooks/           # Custom hooks
└── utils/           # Utility functions
```

### Backend (Node.js)

```
server/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── models/          # Database models
├── routes/          # API routes
└── utils/           # Utility functions
```

## Pull Request Process

1. **Ensure your PR:**
   - Follows code style guidelines
   - Includes tests if applicable
   - Updates documentation if needed
   - Has a clear description
   - Links related issues

2. **PR Review:**
   - Maintainers will review your PR
   - Address any requested changes
   - Keep the conversation productive
   - Be patient and respectful

3. **After Approval:**
   - PR will be merged by maintainers
   - Your contribution will be credited
   - Thank you for contributing! 🎉

## Code Review Guidelines

### For Contributors:
- Be open to feedback
- Respond to comments promptly
- Ask questions if unclear
- Update PR based on feedback

### For Reviewers:
- Be constructive and respectful
- Explain reasoning for suggestions
- Appreciate the effort
- Approve when ready

## Getting Help

- Check the [README](./README.md) for setup instructions
- Review [SETUP.md](./SETUP.md) for quick start
- Check existing issues and PRs
- Ask questions in discussions
- Join our community chat (if available)

## Recognition

All contributors will be recognized in:
- README contributors section
- Release notes
- Project credits

## License

By contributing to SwapCycle, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making SwapCycle better!** 🚀
